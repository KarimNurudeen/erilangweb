/**
 * A small, real interpreter for the subset of Erilang used in the homepage code
 * samples (SET/show/FOR/IF/DEFINE/RETURN/DATA CLASS/EXPORT/INCLUDE/CALL/AWAIT/assert).
 * It is not a general-purpose implementation of the language — network and
 * multi-file I/O are stubbed — but everything else genuinely executes: loops run,
 * functions call, assertions can fail, and output is produced by tree-walking the
 * parsed program, not by returning a canned string.
 */

type TokType = 'ident' | 'string' | 'number' | 'op' | 'eof';
interface Tok {
  type: TokType;
  value: string;
}

const KEYWORDS = new Set([
'AND', 'AS', 'ASYNC', 'AWAIT', 'CALL', 'CLASS', 'CONST', 'DATA', 'DEFINE', 'DO',
'ELSE', 'END', 'EXPORT', 'FALSE', 'FIELDS', 'FOR', 'FROM', 'IF', 'INCLUDE', 'INTO',
'NONE', 'NOT', 'OF', 'OR', 'RETURN', 'SET', 'STEP', 'TO', 'TRUE', 'WITH']);


function tokenize(src: string): Tok[] {
  const tokens: Tok[] = [];
  let i = 0;
  while (i < src.length) {
    const ch = src[i];
    if (ch === '#') {
      while (i < src.length && src[i] !== '\n') i++;
      continue;
    }
    if (/\s/.test(ch)) {
      i++;
      continue;
    }
    if (ch === '"') {
      let j = i + 1;
      let value = '';
      while (j < src.length && src[j] !== '"') {
        if (src[j] === '\\' && j + 1 < src.length) {
          const next = src[j + 1];
          value += next === 'n' ? '\n' : next === 't' ? '\t' : next;
          j += 2;
        } else {
          value += src[j];
          j++;
        }
      }
      tokens.push({ type: 'string', value });
      i = j + 1;
      continue;
    }
    if (/[0-9]/.test(ch)) {
      let j = i;
      while (j < src.length && /[0-9.]/.test(src[j])) j++;
      tokens.push({ type: 'number', value: src.slice(i, j) });
      i = j;
      continue;
    }
    if (/[A-Za-z_]/.test(ch)) {
      let j = i;
      while (j < src.length && /[A-Za-z0-9_.]/.test(src[j])) j++;
      tokens.push({ type: 'ident', value: src.slice(i, j) });
      i = j;
      continue;
    }
    const two = src.slice(i, i + 2);
    if (['==', '!=', '>=', '<='].includes(two)) {
      tokens.push({ type: 'op', value: two });
      i += 2;
      continue;
    }
    tokens.push({ type: 'op', value: ch });
    i++;
  }
  tokens.push({ type: 'eof', value: '' });
  return tokens;
}

// ---------- AST ----------

type Node = any;

class Parser {
  toks: Tok[];
  pos = 0;
  exports: Set<string> = new Set();

  constructor(toks: Tok[]) {
    this.toks = toks;
  }

  peek(offset = 0) {
    return this.toks[Math.min(this.pos + offset, this.toks.length - 1)];
  }
  isKeyword(word: string, offset = 0) {
    const t = this.peek(offset);
    return t.type === 'ident' && t.value.toUpperCase() === word;
  }
  next() {
    return this.toks[this.pos++];
  }
  expectKeyword(word: string) {
    if (!this.isKeyword(word)) {
      throw new Error(`Expected ${word} but found "${this.peek().value}"`);
    }
    return this.next();
  }
  expectOp(op: string) {
    if (this.peek().type !== 'op' || this.peek().value !== op) {
      throw new Error(`Expected "${op}" but found "${this.peek().value}"`);
    }
    return this.next();
  }

  parseProgram(): Node[] {
    const stmts: Node[] = [];
    while (this.peek().type !== 'eof') stmts.push(this.parseStatement());
    return stmts;
  }

  parseBlock(): Node[] {
    const stmts: Node[] = [];
    while (
    this.peek().type !== 'eof' && !(
    this.isKeyword('END') || this.isKeyword('ELSE')))
    {
      stmts.push(this.parseStatement());
    }
    return stmts;
  }

  parseStatement(): Node {
    if (this.isKeyword('SET') || this.isKeyword('CONST')) {
      this.next();
      const name = this.next().value;
      this.expectKeyword('TO');
      const expr = this.parseExpr();
      return { type: 'Set', name, expr };
    }
    if (this.isKeyword('FOR')) {
      this.next();
      const varName = this.next().value;
      this.expectKeyword('FROM');
      const from = this.parseExpr();
      this.expectKeyword('TO');
      const to = this.parseExpr();
      let step: Node | null = null;
      if (this.isKeyword('STEP')) {
        this.next();
        step = this.parseExpr();
      }
      this.expectKeyword('DO');
      const body = this.parseBlock();
      this.expectKeyword('END');
      return { type: 'For', varName, from, to, step, body };
    }
    if (this.isKeyword('IF')) {
      return this.parseIf();
    }
    if (this.isKeyword('ASYNC') && this.isKeyword('DEFINE', 1) || this.isKeyword('DEFINE')) {
      if (this.isKeyword('ASYNC')) this.next();
      this.next();
      const name = this.next().value;
      const params: string[] = [];
      if (this.isKeyword('WITH')) {
        this.next();
        params.push(this.next().value);
        while (this.peek().type === 'op' && this.peek().value === ',') {
          this.next();
          params.push(this.next().value);
        }
      }
      this.expectKeyword('DO');
      const body = this.parseBlock();
      this.expectKeyword('END');
      return { type: 'Define', name, params, body };
    }
    if (this.isKeyword('RETURN')) {
      this.next();
      const atEnd = this.isKeyword('END') || this.isKeyword('ELSE') || this.peek().type === 'eof';
      const expr = atEnd ? { type: 'Literal', value: undefined } : this.parseExpr();
      return { type: 'Return', expr };
    }
    if (this.isKeyword('DATA') && this.isKeyword('CLASS', 1)) {
      this.next();
      this.next();
      const name = this.next().value;
      const fields: string[] = [];
      if (this.isKeyword('FIELDS')) {
        this.next();
        fields.push(this.next().value);
        while (this.peek().type === 'op' && this.peek().value === ',') {
          this.next();
          fields.push(this.next().value);
        }
      }
      this.expectKeyword('END');
      return { type: 'DataClass', name, fields };
    }
    if (this.isKeyword('EXPORT')) {
      this.next();
      const names = [this.next().value];
      while (this.peek().type === 'op' && this.peek().value === ',') {
        this.next();
        names.push(this.next().value);
      }
      for (const n of names) this.exports.add(n);
      return { type: 'Export', names };
    }
    if (this.isKeyword('INCLUDE')) {
      this.next();
      const file = this.next().value;
      this.expectKeyword('AS');
      const alias = this.next().value;
      return { type: 'Include', file, alias };
    }
    if (this.isKeyword('AWAIT') || this.isKeyword('CALL')) {
      const isAwait = this.isKeyword('AWAIT');
      if (isAwait) this.next();
      this.expectKeyword('CALL');
      const name = this.next().value;
      const args: Node[] = [];
      if (this.isKeyword('WITH')) {
        this.next();
        args.push(this.parseExpr());
        while (this.peek().type === 'op' && this.peek().value === ',') {
          this.next();
          args.push(this.parseExpr());
        }
      }
      let into: string | null = null;
      if (this.isKeyword('INTO')) {
        this.next();
        into = this.next().value;
      }
      return { type: 'CallStmt', name, args, into };
    }
    const expr = this.parseExpr();
    return { type: 'ExprStmt', expr };
  }

  parseIf(): Node {
    this.expectKeyword('IF');
    const cond = this.parseExpr();
    this.expectKeyword('DO');
    const thenBlock = this.parseBlock();
    let elseBlock: Node[] | null = null;
    if (this.isKeyword('ELSE')) {
      this.next();
      if (this.isKeyword('IF')) {
        elseBlock = [this.parseIf()];
        return { type: 'If', cond, thenBlock, elseBlock };
      }
      elseBlock = this.parseBlock();
      this.expectKeyword('END');
      return { type: 'If', cond, thenBlock, elseBlock };
    }
    this.expectKeyword('END');
    return { type: 'If', cond, thenBlock, elseBlock };
  }

  // expression precedence: or > and > equality > relational > additive > multiplicative > unary > postfix
  parseExpr(): Node {
    return this.parseOr();
  }
  parseOr(): Node {
    let left = this.parseAnd();
    while (this.isKeyword('OR')) {
      this.next();
      left = { type: 'Bin', op: 'OR', left, right: this.parseAnd() };
    }
    return left;
  }
  parseAnd(): Node {
    let left = this.parseEquality();
    while (this.isKeyword('AND')) {
      this.next();
      left = { type: 'Bin', op: 'AND', left, right: this.parseEquality() };
    }
    return left;
  }
  parseEquality(): Node {
    let left = this.parseRelational();
    while (this.peek().type === 'op' && (this.peek().value === '==' || this.peek().value === '!=')) {
      const op = this.next().value;
      left = { type: 'Bin', op, left, right: this.parseRelational() };
    }
    return left;
  }
  parseRelational(): Node {
    let left = this.parseAdditive();
    while (
    this.peek().type === 'op' && ['>', '<', '>=', '<='].includes(this.peek().value))
    {
      const op = this.next().value;
      left = { type: 'Bin', op, left, right: this.parseAdditive() };
    }
    return left;
  }
  parseAdditive(): Node {
    let left = this.parseMultiplicative();
    while (this.peek().type === 'op' && (this.peek().value === '+' || this.peek().value === '-')) {
      const op = this.next().value;
      left = { type: 'Bin', op, left, right: this.parseMultiplicative() };
    }
    return left;
  }
  parseMultiplicative(): Node {
    let left = this.parseUnary();
    while (
    this.peek().type === 'op' && ['*', '/', '%'].includes(this.peek().value))
    {
      const op = this.next().value;
      left = { type: 'Bin', op, left, right: this.parseUnary() };
    }
    return left;
  }
  parseUnary(): Node {
    if (this.isKeyword('NOT')) {
      this.next();
      return { type: 'Not', expr: this.parseUnary() };
    }
    if (this.peek().type === 'op' && this.peek().value === '-') {
      this.next();
      return { type: 'Neg', expr: this.parseUnary() };
    }
    return this.parseOfExpr();
  }
  parseOfExpr(): Node {
    const node = this.parsePostfix();
    if (this.isKeyword('OF') && node.type === 'Ident') {
      this.next();
      const object = this.parsePostfix();
      return { type: 'Of', field: node.name, object };
    }
    return node;
  }
  parsePostfix(): Node {
    const node = this.parsePrimary();
    if (node.type === 'Ident' && this.peek().type === 'op' && this.peek().value === '(') {
      this.next();
      const args: Node[] = [];
      if (!(this.peek().type === 'op' && this.peek().value === ')')) {
        args.push(this.parseExpr());
        while (this.peek().type === 'op' && this.peek().value === ',') {
          this.next();
          args.push(this.parseExpr());
        }
      }
      this.expectOp(')');
      return { type: 'Call', name: node.name, args };
    }
    return node;
  }
  parsePrimary(): Node {
    const t = this.peek();
    if (t.type === 'string') {
      this.next();
      return { type: 'Literal', value: t.value };
    }
    if (t.type === 'number') {
      this.next();
      return { type: 'Literal', value: parseFloat(t.value) };
    }
    if (t.type === 'op' && t.value === '(') {
      this.next();
      const expr = this.parseExpr();
      this.expectOp(')');
      return expr;
    }
    if (t.type === 'ident') {
      const upper = t.value.toUpperCase();
      if (upper === 'NONE') {
        this.next();
        return { type: 'Literal', value: null };
      }
      if (upper === 'TRUE') {
        this.next();
        return { type: 'Literal', value: true };
      }
      if (upper === 'FALSE') {
        this.next();
        return { type: 'Literal', value: false };
      }
      this.next();
      return { type: 'Ident', name: t.value };
    }
    throw new Error(`Unexpected token "${t.value}"`);
  }
}

// ---------- Interpreter ----------

class ReturnSignal {
  constructor(public value: any) {}
}
class AssertError extends Error {}

class Env {
  vars = new Map<string, any>();
  constructor(public parent: Env | null = null) {}
  get(name: string): any {
    if (this.vars.has(name)) return this.vars.get(name);
    if (this.parent) return this.parent.get(name);
    throw new Error(`"${name}" is not defined`);
  }
  has(name: string): boolean {
    if (this.vars.has(name)) return true;
    return this.parent ? this.parent.has(name) : false;
  }
  setExisting(name: string, value: any): boolean {
    if (this.vars.has(name)) {
      this.vars.set(name, value);
      return true;
    }
    return this.parent ? this.parent.setExisting(name, value) : false;
  }
  declare(name: string, value: any) {
    this.vars.set(name, value);
  }
  assign(name: string, value: any) {
    if (!this.setExisting(name, value)) this.declare(name, value);
  }
}

interface UserFn {
  params: string[];
  body: Node[];
  closure: Env;
}

function toDisplay(v: any): string {
  if (v === null || v === undefined) return 'NONE';
  if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
  if (typeof v === 'number') {
    return Number.isInteger(v) ? String(v) : String(Math.round(v * 1e10) / 1e10);
  }
  return String(v);
}

class Interpreter {
  output: string[] = [];
  modules: Record<string, string>;

  constructor(modules: Record<string, string>) {
    this.modules = modules;
  }

  makeGlobalEnv(): Env {
    const env = new Env();
    env.declare('show', { __builtin: 'show' });
    env.declare('TO_STRING', { __builtin: 'to_string' });
    env.declare('TO_NUMBER', { __builtin: 'to_number' });
    env.declare('assert', { __builtin: 'assert' });
    env.declare('net', { get: { __builtin: 'net.get' } });
    return env;
  }

  callFunction(fn: UserFn, args: any[]): any {
    const env = new Env(fn.closure);
    fn.params.forEach((p, i) => env.declare(p, args[i]));
    try {
      this.execBlock(fn.body, env);
    } catch (e) {
      if (e instanceof ReturnSignal) return e.value;
      throw e;
    }
    return undefined;
  }

  callBuiltin(kind: string, args: any[]): any {
    switch (kind) {
      case 'show':
        this.output.push(toDisplay(args[0]));
        return undefined;
      case 'to_string':
        return toDisplay(args[0]);
      case 'to_number':
        return parseFloat(args[0]);
      case 'assert':
        if (!args[0]) throw new AssertError(String(args[1] ?? 'Assertion failed'));
        return undefined;
      case 'net.get':
        return JSON.stringify({ item: String(args[0]).split('/').pop(), price: 24.99, currency: 'USD' });
      default:
        throw new Error(`Unknown builtin ${kind}`);
    }
  }

  evalNode(node: Node, env: Env): any {
    switch (node.type) {
      case 'Literal':
        return node.value;
      case 'Ident':
        return env.get(node.name);
      case 'Not':
        return !this.evalNode(node.expr, env);
      case 'Neg':
        return -this.evalNode(node.expr, env);
      case 'Of':{
          const obj = this.evalNode(node.object, env);
          return obj ? obj[node.field] : null;
        }
      case 'Bin':{
          const a = this.evalNode(node.left, env);
          const b = this.evalNode(node.right, env);
          switch (node.op) {
            case '+':return typeof a === 'string' || typeof b === 'string' ? toDisplay(a) + toDisplay(b) : a + b;
            case '-':return a - b;
            case '*':return a * b;
            case '/':return a / b;
            case '%':return a % b;
            case '==':return typeof a === 'number' && typeof b === 'number' ? Math.abs(a - b) < 1e-9 : a === b;
            case '!=':return typeof a === 'number' && typeof b === 'number' ? Math.abs(a - b) >= 1e-9 : a !== b;
            case '>':return a > b;
            case '<':return a < b;
            case '>=':return a >= b;
            case '<=':return a <= b;
            case 'AND':return a && b;
            case 'OR':return a || b;
          }
          throw new Error(`Unknown operator ${node.op}`);
        }
      case 'Call':
        return this.evalCall(node.name, node.args.map((a: Node) => this.evalNode(a, env)), env);
      default:
        throw new Error(`Cannot evaluate node ${node.type}`);
    }
  }

  resolveCallable(name: string, env: Env): any {
    if (name.includes('.')) {
      const parts = name.split('.');
      let target = env.get(parts[0]);
      for (let i = 1; i < parts.length; i++) target = target?.[parts[i]];
      return target;
    }
    return env.get(name);
  }

  evalCall(name: string, args: any[], env: Env): any {
    const target = this.resolveCallable(name, env);
    if (target && typeof target === 'object' && '__builtin' in target) {
      return this.callBuiltin(target.__builtin, args);
    }
    if (target && target.params) {
      return this.callFunction(target as UserFn, args);
    }
    throw new Error(`"${name}" is not a function`);
  }

  execBlock(stmts: Node[], env: Env) {
    for (const stmt of stmts) this.exec(stmt, env);
  }

  exec(stmt: Node, env: Env) {
    switch (stmt.type) {
      case 'Set':
        env.assign(stmt.name, this.evalNode(stmt.expr, env));
        return;
      case 'ExprStmt':
        this.evalNode(stmt.expr, env);
        return;
      case 'For':{
          const from = this.evalNode(stmt.from, env);
          const to = this.evalNode(stmt.to, env);
          const step = stmt.step ? this.evalNode(stmt.step, env) : 1;
          for (let i = from; step >= 0 ? i <= to : i >= to; i += step) {
            env.declare(stmt.varName, i);
            this.execBlock(stmt.body, env);
          }
          return;
        }
      case 'If':
        if (this.evalNode(stmt.cond, env)) this.execBlock(stmt.thenBlock, env);
        else if (stmt.elseBlock) this.execBlock(stmt.elseBlock, env);
        return;
      case 'Define':{
          const fn: UserFn = { params: stmt.params, body: stmt.body, closure: env };
          env.declare(stmt.name, fn);
          return;
        }
      case 'Return':
        throw new ReturnSignal(this.evalNode(stmt.expr, env));
      case 'DataClass':
        return;
      case 'Export':
        return;
      case 'CallStmt':{
          const result = this.evalCall(stmt.name, stmt.args.map((a: Node) => this.evalNode(a, env)), env);
          if (stmt.into) env.assign(stmt.into, result);
          return;
        }
      case 'Include':{
          const source = this.modules[stmt.file];
          if (source === undefined) throw new Error(`No such file "${stmt.file}"`);
          const parser = new Parser(tokenize(source));
          const program = parser.parseProgram();
          const moduleEnv = this.makeGlobalEnv();
          this.execBlock(program, moduleEnv);
          const names = parser.exports.size > 0 ? Array.from(parser.exports) : Array.from(moduleEnv.vars.keys());
          const ns: Record<string, any> = {};
          for (const n of names) ns[n] = moduleEnv.vars.get(n);
          env.declare(stmt.alias, ns);
          return;
        }
      default:
        throw new Error(`Cannot execute statement ${stmt.type}`);
    }
  }
}

function splitModules(source: string): {entry: string;modules: Record<string, string>;} {
  const headerRe = /^[ \t]*#[ \t]*([A-Za-z0-9_.-]+\.eri)[ \t]*$/gm;
  const matches = Array.from(source.matchAll(headerRe));
  if (matches.length < 2) return { entry: source, modules: {} };

  const modules: Record<string, string> = {};
  let entry = source;
  for (let i = 0; i < matches.length; i++) {
    const filename = matches[i][1];
    const start = (matches[i].index ?? 0) + matches[i][0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index ?? source.length : source.length;
    const body = source.slice(start, end);
    if (i === matches.length - 1) entry = body;else
    modules[filename] = body;
  }
  return { entry, modules };
}

export function runErilang(source: string): {output: string[];error: string | null;} {
  try {
    const { entry, modules } = splitModules(source);
    const interp = new Interpreter(modules);
    const parser = new Parser(tokenize(entry));
    const program = parser.parseProgram();
    const env = interp.makeGlobalEnv();
    try {
      interp.execBlock(program, env);
    } catch (e) {
      if (e instanceof AssertError) {
        return { output: interp.output, error: `AssertionError: ${e.message}` };
      }
      if (e instanceof ReturnSignal) {
        return { output: interp.output, error: null };
      }
      throw e;
    }
    return { output: interp.output, error: null };
  } catch (e) {
    return { output: [], error: e instanceof Error ? e.message : String(e) };
  }
}
