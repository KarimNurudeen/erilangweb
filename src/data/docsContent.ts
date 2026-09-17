export type DocBlockType = 'p' | 'h3' | 'code' | 'table' | 'note';

export interface DocBlock {
  type: DocBlockType;
  text?: string;
  code?: string;
  output?: string;
  columns?: [string, string];
  rows?: [string, string][];
  /** False when a 'code' block can't execute standalone in the sandbox (a fragment, a terminal command, a REPL-only feature, missing sample data, or a feature needing hardware/a display/a real server). Defaults to true. */
  runnable?: boolean;
  /** Shown in place of the Run button when runnable is false. */
  runNote?: string;
}

export interface DocPage {
  slug: string;
  title: string;
  description: string;
  blocks: DocBlock[];
}

const NEEDS_CSV_NOTE = "This needs a real CSV file on disk to LOAD. The sandbox has no sample data and a read-only filesystem, so this works when run locally with your own data.";
const NEEDS_LOCAL_FS_NOTE = "The sandbox's filesystem is read-only, so this isn't possible here. It works normally when run locally.";
const NEEDS_DISPLAY_NOTE = "This opens a real window/display, which the sandbox doesn't have. It works normally when run locally.";
const NEEDS_HARDWARE_NOTE = "This needs real microphone/speaker hardware, which the sandbox doesn't have. It works normally when run locally.";
const BLOCKS_FOREVER_NOTE = "This blocks forever waiting for connections/events, which can't complete in a single sandboxed run. It works normally when run locally as a long-lived script.";
const MULTI_FILE_NOTE = "This spans more than one file, and a single sandbox run can only execute one file. See it work with the CLI.";

export const docPages: DocPage[] = [
{
  slug: 'introduction',
  title: 'Introduction',
  description: 'What Erilang is, who it is for, and how this guide is organized.',
  blocks: [
  {
    type: 'p',
    text: 'Erilang is a small, declarative, English-like language built for data science. It reads like plain English rather than dense symbols, and it comes with a real, built-in data engine. Loading, cleaning, transforming, grouping, and charting tables of data are first-class parts of the language itself, not something bolted on afterward.'
  },
  {
    type: 'p',
    text: "This readability is deliberate: code that reads like a sentence is easier for everyone to follow, and it's especially valuable for programmers using screen readers, for whom a wall of dense symbols is far harder to follow by ear than a sentence. That same thinking is why CHART, covered in the Data Science section of this guide, never just draws a picture; it also produces a genuine, data-computed spoken-language description of what the chart shows, useful whether or not you can see the image."
  },
  {
    type: 'p',
    text: 'None of this comes at the cost of being a serious, general-purpose language. Erilang has real object-oriented programming (classes, inheritance, interfaces, annotations), genuine error handling, synchronous and asynchronous networking, a package manager with its own registry, and a growing standard library covering everything from SQLite to image processing to desktop automation.'
  },
  { type: 'h3', text: 'What Erilang is good for' },
  {
    type: 'p',
    text: "Data analysis, cleaning, statistics, and reporting are Erilang's biggest strength. See the Data Science section of this guide. Beyond that, it is a genuinely general-purpose language: people use it for backend services and APIs, command-line tools, network programming, working with files and databases, small games and graphical programs, and automating everyday tasks. If you have written another programming language before, most of Erilang's ideas will feel familiar, since the syntax is simply more readable."
  },
  { type: 'h3', text: 'How this guide is organized' },
  {
    type: 'p',
    text: 'The first several chapters form a tutorial: read them in order and you will go from nothing to writing real, useful programs. The later chapters, including the whole Data Science and Standard Library sections, are a reference: each stands on its own, so once you know the basics, you can jump straight to whichever topic you need. The final chapter is a compact quick reference you can keep open while you work.'
  }]

},
{
  slug: 'getting-started',
  title: 'Getting Started',
  description: 'Installing Erilang, writing your first program, and the two ways to work with it.',
  blocks: [
  { type: 'h3', text: 'Installing Erilang' },
  {
    type: 'p',
    text: 'Download the installer or package for your platform from the Releases page and follow the on-screen instructions. Once installed, the erilang command is available on your PATH.'
  },
  { type: 'h3', text: 'Your first program' },
  {
    type: 'p',
    text: 'Erilang programs live in plain text files ending in .eri. Create a file called hello.eri with the following line:'
  },
  { type: 'code', code: 'show("Hello, world!")' },
  { type: 'p', text: 'Run it from a terminal:' },
  {
    type: 'code',
    code: 'erilang run hello.eri',
    output: 'Hello, world!',
    runnable: false,
    runNote: "This is a terminal command, not Erilang source. Run it from your own terminal."
  },
  { type: 'h3', text: 'Two ways to work' },
  {
    type: 'p',
    text: 'You can run a saved .eri file the way you just did, or you can open the interactive shell. Simply type erilang at your terminal with no arguments (or erilang repl, spelled explicitly), and type statements one at a time, seeing results immediately. The interactive shell is covered fully in The Interactive Shell (REPL), and it is an excellent way to experiment as you learn.'
  },
  { type: 'h3', text: 'Comments' },
  { type: 'p', text: 'Anything after a # on a line is a comment, ignored when the program runs, whether as its own line or trailing after a statement. Comments are for you and for anyone reading your code later.' },
  {
    type: 'code',
    code: '# This line explains what happens next\nshow("Comments do not affect the program")'
  },
  { type: 'h3', text: 'Documentation comments' },
  {
    type: 'p',
    text: "A comment written with two hashes (##), immediately before a function, class, or interface, is a doc comment: Erilang keeps it attached to that item as real, structured documentation, retrievable at runtime and picked up by the doc generator, rather than just discarded like a plain comment. Several consecutive ## lines merge into one multi-line doc."
  },
  {
    type: 'code',
    code: '## Adds two numbers together\nDEFINE add_two WITH a, b DO\nRETURN a + b\nEND'
  }]

},
{
  slug: 'language-basics',
  title: 'Language Basics',
  description: 'Variables, constants, names, and printing values.',
  blocks: [
  { type: 'h3', text: 'Variables' },
  {
    type: 'p',
    text: "A variable is created and assigned with SET ... TO .... Erilang does not require you to declare a variable's type in advance. A variable can hold a number, text, or any other kind of value, and what it holds can change over time."
  },
  {
    type: 'code',
    code: 'SET age TO 25\nSET name TO "Ama"\nshow(name)\nshow(age)',
    output: 'Ama\n25'
  },
  { type: 'h3', text: 'Constants' },
  {
    type: 'p',
    text: "A constant is declared with CONST ... TO ... instead of SET. Once declared, a constant's value can never be changed again in the same scope, since attempting to reassign it is caught at compile time, before the program ever runs. This is a compile-time-only check: CONST generates the exact same code SET does, so there is no runtime cost, and a CONST holding a LIST or MAP can still have its own contents mutated. Only rebinding the name itself is rejected."
  },
  { type: 'code', code: 'CONST max_attempts TO 3\nshow(max_attempts)' },
  {
    type: 'note',
    text: 'Use a constant whenever a value genuinely should never change during the life of your program, like a configuration limit or a fixed conversion rate.'
  },
  { type: 'h3', text: 'Names' },
  {
    type: 'p',
    text: "Names for variables, functions, and classes can use letters, digits, and underscores, and cannot start with a digit. Most of Erilang's own keywords, words like IF, WHILE, and DEFINE, are true reserved words and cannot be used as names anywhere. A smaller set are contextual (soft) keywords instead, special only in their own specific position (see Contextual Keywords in the Reference section). If you try to use a true reserved word as a name, Erilang tells you plainly that the word is reserved, rather than failing with a cryptic error."
  },
  { type: 'h3', text: 'Printing values' },
  {
    type: 'p',
    text: 'The show(...) function prints a value. It works on any kind of value: numbers, text, lists, and more all display sensibly, and it renders things like a namespace, a stored function, a SOCKET, or an HTTP response the way an Erilang author should see them, never a raw internal representation.'
  },
  { type: 'code', code: 'show(42)\nshow("a piece of text")\nshow(3.14)' }]

},
{
  slug: 'expressions-operators',
  title: 'Expressions and Operators',
  description: 'Arithmetic, comparison, and logic operators, and how they combine.',
  blocks: [
  {
    type: 'p',
    text: 'Erilang has a full, standard set of operators for arithmetic, comparison, and logic, all combining predictably (multiplication before addition, and so on) exactly as you would expect from ordinary arithmetic. This is the one expression grammar in the whole language: SET, IF/WHILE conditions, FILTER\'s comparison value, RETURN, and CALL arguments all share it. Parentheses can always be used to make grouping explicit.'
  },
  { type: 'h3', text: 'Arithmetic' },
  {
    type: 'table',
    rows: [
    ['a + b', 'Addition'],
    ['a - b', 'Subtraction'],
    ['a * b', 'Multiplication'],
    ['a / b', 'Division'],
    ['a % b', 'Remainder (modulo)'],
    ['a ** b', 'Exponentiation (a raised to the power of b)']]

  },
  { type: 'h3', text: 'Comparison' },
  {
    type: 'table',
    rows: [
    ['a == b', 'Equal to'],
    ['a != b', 'Not equal to'],
    ['a > b', 'Greater than'],
    ['a < b', 'Less than'],
    ['a >= b', 'Greater than or equal to'],
    ['a <= b', 'Less than or equal to']]

  },
  { type: 'h3', text: 'Logic' },
  {
    type: 'table',
    rows: [
    ['a AND b', 'True only if both a and b are true'],
    ['a OR b', 'True if either a or b is true'],
    ['NOT a', 'Flips a true/false value']]

  },
  {
    type: 'code',
    code: 'SET x TO 7\nIF x > 5 AND x < 10 DO\nshow("x is between 5 and 10")\nEND'
  },
  { type: 'h3', text: 'Operator precedence' },
  {
    type: 'p',
    text: 'From tightest to loosest binding: unary operators (NOT, unary minus) bind first, then multiplication/division/remainder/exponent, then addition/subtraction, then comparisons, then AND, then OR. Operators at the same level are left-associative. When in doubt, parentheses always make intent explicit and are never wrong to add.'
  },
  { type: 'code', code: 'show(2 + 3 * 4) # 14, not 20\nshow((2 + 3) * 4) # 20' },
  { type: 'h3', text: 'Text and escape sequences' },
  {
    type: 'p',
    text: 'Quoted text uses double quotes. \\" and \\\\ escape a literal quote or backslash; \\n, \\t, and \\r produce a real newline, tab, or carriage return, since there is no other way to type one directly into a .eri file. This means an unescaped Windows-style path like "C:\\temp" means something different than its literal characters. Forward slashes ("C:/temp") sidestep this entirely and already work everywhere here.'
  }]

},
{
  slug: 'control-flow',
  title: 'Control Flow',
  description: 'Conditionals, loops, breaking and skipping, and branching by value or by type.',
  blocks: [
  { type: 'h3', text: 'Conditionals' },
  {
    type: 'code',
    code: 'SET score TO 82\n\nIF score >= 90 DO\nshow("Excellent")\nELSE\nIF score >= 70 DO\nshow("Good")\nELSE\nshow("Keep practicing")\nEND\nEND',
    output: 'Good'
  },
  { type: 'h3', text: 'While loops' },
  { type: 'code', code: 'SET i TO 0\nWHILE i < 5 DO\nshow(i)\nSET i TO i + 1\nEND' },
  { type: 'h3', text: 'Counting loops' },
  {
    type: 'p',
    text: 'For a simple counting loop, FOR ... FROM ... TO is more direct than a manual WHILE, and counts up to and including its end value, so "from 1 to 10" means ten numbers. An optional STEP changes the increment, and DOWN TO counts backward.'
  },
  {
    type: 'code',
    code: 'FOR i FROM 1 TO 5 DO\nshow(i)\nEND\n\nFOR i FROM 10 DOWN TO 1 STEP 2 DO\nshow(i)\nEND'
  },
  { type: 'h3', text: 'Iterating over a collection' },
  { type: 'p', text: 'FOR EACH walks through every row of a DATASET, every item of a LIST or UNIQUE_LIST, or every value from a streaming source like csv_stream(...) (see Working with Files and Data), consumed lazily one at a time.' },
  {
    type: 'code',
    code: 'SET fruits TO LIST OF "apple", "banana", "cherry"\nFOR EACH fruit IN fruits DO\nshow(fruit)\nEND'
  },
  { type: 'h3', text: 'Breaking and skipping' },
  {
    type: 'p',
    text: 'BREAK exits the nearest enclosing loop immediately. CONTINUE skips the rest of the current pass and moves to the next one. Both only ever affect the loop directly containing them, even when loops are nested. TRY/CATCH and IF/ELSE do not count as boundaries, but crossing into a nested DEFINE does, since a nested function is its own scope.'
  },
  {
    type: 'code',
    code: 'SET i TO 0\nWHILE i < 10 DO\nSET i TO i + 1\nIF i == 3 DO\nCONTINUE\nEND\nIF i == 6 DO\nBREAK\nEND\nshow(i)\nEND',
    output: '1\n2\n4\n5'
  },
  { type: 'h3', text: 'Pattern matching with WHEN and CASE' },
  {
    type: 'p',
    text: 'For choosing between several fixed possibilities, WHEN ... DO CASE ... END is often clearer than a long IF/ELSE chain. The subject expression is evaluated exactly once, then compared top-to-bottom against each CASE value; the first match runs and everything else is skipped. ELSE (optional, needing no DO or END of its own) runs if nothing matched.'
  },
  {
    type: 'code',
    code: 'SET day TO 5\nWHEN day DO\nCASE 6 DO\nshow("Saturday")\nEND\nCASE 7 DO\nshow("Sunday")\nEND\nCASE 5 DO\nshow("Friday, almost the weekend")\nEND\nEND',
    output: 'Friday, almost the weekend'
  },
  {
    type: 'p',
    text: 'A second CASE form, CASE TYPE <expr> DO, matches by type_of(...) instead of by value, and the two forms compose freely in the same WHEN.'
  },
  {
    type: 'code',
    code: 'SET x TO 42\nWHEN x DO\nCASE TYPE "NUMBER" DO\nshow("it\'s a number")\nEND\nCASE TYPE "STRING" DO\nshow("it\'s a string")\nEND\nELSE\nshow("something else")\nEND',
    output: "it's a number"
  }]

},
{
  slug: 'functions',
  title: 'Functions',
  description: 'Defining and calling functions, default values, multiple returns, closures, recursion, and scoping.',
  blocks: [
  { type: 'h3', text: 'Defining and calling a function' },
  {
    type: 'code',
    code: 'DEFINE greet WITH name DO\nshow("Hello, " + name)\nEND\n\ngreet("Kofi")',
    output: 'Hello, Kofi'
  },
  { type: 'h3', text: 'Returning a value' },
  {
    type: 'code',
    code: 'DEFINE square WITH n DO\nRETURN n * n\nEND\n\nSET result TO square(6)\nshow(result)',
    output: '36'
  },
  { type: 'h3', text: 'Two ways to call a function' },
  {
    type: 'p',
    text: 'A function can be called as its own line with CALL ... WITH ... INTO, which is useful when the call is the whole point of that step, or inline with parentheses, wherever a value is needed, including nested inside another expression. Both forms generate the exact same call; use whichever reads more naturally for a given line. WITH and INTO are each independently optional on CALL: omit WITH for a no-argument function, omit INTO for a call made purely for its side effects.'
  },
  {
    type: 'code',
    code: 'CALL square WITH 6 INTO result\nshow(result)\n\n# or, inline:\nshow(square(6) + 1)'
  },
  { type: 'h3', text: 'Default parameter values' },
  {
    type: 'p',
    text: 'Any parameter can be given a default with AS <expr>, making it optional at the call site. Once one parameter has a default, every parameter after it needs one too. This is not (yet) supported at the call site, so CALL\'s own WITH stays positional only.'
  },
  {
    type: 'code',
    code: 'DEFINE greet WITH name AS "World" DO\nshow("Hello, " + name)\nEND\n\ngreet()\ngreet("Ama")',
    output: 'Hello, World\nHello, Ama'
  },
  { type: 'h3', text: 'Returning more than one value' },
  {
    type: 'p',
    text: 'A function can hand back several values at once. RETURN <v1>, <v2>, ... paired with SET <var1>, <var2>, ... TO <expr> destructures positionally. This is call-site sugar only, not a real Erilang TUPLE type, so always destructure immediately rather than capturing into one plain variable.'
  },
  {
    type: 'code',
    code: 'DEFINE analyze WITH n DO\nRETURN n * 2, n * 3\nEND\n\nSET doubled, tripled TO analyze(5)\nshow(doubled)\nshow(tripled)',
    output: '10\n15'
  },
  {
    type: 'p',
    text: 'When the values need names instead, RETURN a MAP. It\'s the same pattern the statistics tier of Data Science uses to return, say, an F-statistic and a p-value together.'
  },
  {
    type: 'code',
    code: 'DEFINE analyze_named WITH n DO\nRETURN MAP WITH doubled AS n * 2, tripled AS n * 3\nEND\n\nSET result TO analyze_named(5)\nshow(doubled OF result)',
    output: '10'
  },
  { type: 'h3', text: 'Nested functions and closures' },
  {
    type: 'p',
    text: "A function can be defined inside another function. The inner function can see and use the outer function's parameters and local variables, even after being called later, and each call to the outer function creates a fresh, independent closure."
  },
  {
    type: 'code',
    code: 'DEFINE make_adder WITH x DO\nDEFINE add_to_x WITH y DO\nRETURN x + y\nEND\nCALL add_to_x WITH 10 INTO result\nRETURN result\nEND\n\nCALL make_adder WITH 5 INTO total\nshow(total)',
    output: '15'
  },
  {
    type: 'note',
    text: 'One gotcha to know: a function defined inside a loop closes over the loop variable by reference, not by the value it had at that iteration. Several such functions, called after the loop ends, all see its final value. Give it its own parameter instead if each call needs its own snapshot.'
  },
  { type: 'h3', text: 'Anonymous functions' },
  {
    type: 'p',
    text: 'DEFINE with no name is an expression, not a declaration, and it is usable anywhere a value is. It is deliberately restricted to a single RETURN <expr> body with no other statements, keeping it a lightweight inline function. Its flagship use is sort\'s optional comparator: a two-argument function returning negative/positive/zero.'
  },
  {
    type: 'code',
    code: 'SET double_fn TO DEFINE WITH n DO RETURN n * 2 END\nshow(double_fn(5))',
    output: '10'
  },
  { type: 'h3', text: 'Recursion' },
  { type: 'p', text: 'A function can call itself. As with any language, make sure there is always a stopping condition.' },
  {
    type: 'code',
    code: 'DEFINE factorial WITH n DO\nIF n <= 1 DO\nRETURN 1\nEND\nRETURN n * factorial(n - 1)\nEND\n\nshow(factorial(5))',
    output: '120'
  },
  { type: 'h3', text: 'Variable scoping: GLOBAL and OUTER' },
  {
    type: 'p',
    text: "Reading an outer or top-level variable from inside a function works with no declaration at all. Writing one needs an explicit declaration: GLOBAL <name>, ... (inside any function, writes the true top-level variable) or OUTER <name>, ... (inside a function nested within another function, writes the nearest enclosing function's local, not the true top level, even from several levels deep). Without either, a plain SET on a name that also exists as a global deliberately creates a fresh local instead."
  },
  {
    type: 'code',
    code: 'SET total_processed TO 0\nDEFINE process_item WITH raw_value DO\nGLOBAL total_processed\nSET total_processed TO total_processed + 1\nRETURN raw_value * 2\nEND\n\nCALL process_item WITH 5 INTO ignored\nshow(total_processed)',
    output: '1'
  },
  {
    type: 'note',
    text: 'A real compile-time check catches the read-before-assignment shape that would otherwise fail at runtime, and points at GLOBAL/OUTER as the fix.'
  }]

},
{
  slug: 'data-types',
  title: 'Data Types',
  description: "Every formal value type Erilang has, and converting between the core ones.",
  blocks: [
  {
    type: 'p',
    text: "Erilang has a small set of core value types you will use constantly, plus a large set of formal types that specific standard-library features produce (a database connection, a loaded image, a socket, and so on). You never have to declare a variable's type in advance. A variable simply holds whatever value it is given, and type_of(...) always tells you what kind of value that is behind the scenes."
  },
  { type: 'h3', text: 'The core types' },
  {
    type: 'table',
    columns: ['Type', 'What it holds'],
    rows: [
    ['NUMBER', 'Any numeric value, whole or with a decimal point. Erilang treats both the same way.'],
    ['STRING', 'Text, written in double quotes.'],
    ['BOOLEAN', 'TRUE or FALSE.'],
    ['NONE', 'Represents an absent or unknown value.'],
    ['DATASET', 'A loaded table of data, produced by LOAD or FILTER, with full support for cleaning, transforming, grouping, and joining.'],
    ['LIST', 'An ordered collection.'],
    ['MAP', 'A key-value collection.'],
    ['UNIQUE_LIST', 'A collection with no duplicates.'],
    ['BYTES', 'Raw binary data.']]

  },
  { type: 'h3', text: 'Types produced by specific library features' },
  {
    type: 'p',
    text: 'Each of these is a formal type type_of(...) reports by name, produced by the standard-library area named alongside it. See that area\'s own page in this guide for the functions that create and use it.'
  },
  {
    type: 'table',
    columns: ['Type', 'Produced by'],
    rows: [
    ['SOCKET', 'socket.create(), for synchronous TCP networking'],
    ['UDP_SOCKET', 'udp.create(), the same underlying class as SOCKET, distinguished by protocol'],
    ['CONNECTION', 'the value socket.run_server\'s handler receives per accepted client'],
    ['WEB_APP', 'web.create_app(), the web framework'],
    ['STACK / QUEUE', 'data_structures.create_stack() / create_queue()'],
    ['LINKED_LIST / BINARY_TREE', 'data_structures.create_linked_list() / create_binary_tree()'],
    ['GROUPED_DATASET', 'GROUP ... BY. Only AGGREGATE turns it back into a real DATASET.'],
    ['CHART', 'CHART ... TO "<path>" INTO, for accessible visualization'],
    ['UI_ELEMENT', 'ui_automation.*, Windows-only accessibility inspection'],
    ['IMAGE', 'image.load_image(...), always RGBA internally'],
    ['AUDIO', 'audio.load_audio(...) / mic.record_audio(...)'],
    ['VIDEO', 'video.load_video(...)'],
    ['HTML_ELEMENT', 'html.parse_html(...), covers a whole document or one matched element'],
    ['WINDOW', 'gui.create_window(...), real window and drawing surface'],
    ['ENUM', 'ENUM Name ... END, the construct itself; one specific member reports its own enum\'s name instead'],
    ['NAMESPACE', 'a built-in library referenced directly (math, os, ...), or an INCLUDEd file\'s own namespace']]

  },
  {
    type: 'note',
    text: 'A CLASS or DATA CLASS instance is its own type, named after the class itself (type_of(pet) == "Dog"), not a generic tag.'
  },
  { type: "h3", text: "Finding out a value's type" },
  {
    type: 'p',
    text: "type_of(value) returns the name of a value's type as text, which is useful when a piece of code needs to behave differently depending on what it was given. It is a direct alias for the same function every runtime type check already calls."
  },
  {
    type: 'code',
    code: 'show(type_of(5))\nshow(type_of("hello"))\nshow(type_of(TRUE))',
    output: 'NUMBER\nSTRING\nBOOLEAN'
  },
  { type: 'h3', text: 'Converting between types' },
  {
    type: 'p',
    text: 'TO_NUMBER, TO_STRING, and TO_BOOLEAN convert a value from one type to another. This exists because Erilang never auto-coerces (concatenating a STRING and a NUMBER with + is otherwise a raw error). convert.to_number(...)/to_string(...)/to_boolean(...) are the exact same functions under their namespaced spelling; both forms work everywhere.'
  },
  {
    type: 'code',
    code: 'SET text_value TO "42"\nSET number_value TO TO_NUMBER(text_value)\nshow(number_value + 1)\n\nshow(TO_STRING(100))\nshow(TO_BOOLEAN("true"))',
    output: '43\n100\nTrue'
  },
  { type: 'h3', text: 'Text strings' },
  { type: 'p', text: "Strings are joined with the plus operator (falling back to a class's own TO_STRING or its auto-repr if one side is a STRING and the plain addition fails; see Object-Oriented Programming). Special characters can be written using an escape sequence: \\n for a new line and \\t for a tab." },
  { type: 'code', code: 'SET first TO "Ama"\nSET last TO "Owusu"\nshow(first + " " + last)', output: 'Ama Owusu' }]

},
{
  slug: 'data-structures',
  title: 'Data Structures',
  description: 'Lists, maps, and sets: the everyday collection types.',
  blocks: [
  { type: 'h3', text: 'Lists' },
  { type: 'p', text: 'A list is an ordered collection of values, created with LIST OF.' },
  {
    type: 'code',
    code: 'SET numbers TO LIST OF 5, 2, 8, 1, 9\nshow(ITEM 1 OF numbers) # position is 1-based',
    output: '5'
  },
  { type: 'h3', text: 'Common list operations' },
  {
    type: 'p',
    text: 'Every one of these is a plain bare-name function, not namespaced. length, remove, and clear in particular are polymorphic across LIST, MAP, and UNIQUE_LIST at runtime. Each takes its container as the first argument, and positions/ranges are 1-indexed and inclusive, matching ITEM and FOR ... FROM ... TO.'
  },
  {
    type: 'table',
    rows: [
    ['append(list, value)', 'Add a value to the end'],
    ['remove(list, value)', 'Remove the first matching value'],
    ['insert(list, value, position)', 'Insert a value at a given position'],
    ['sort(list[, comparator])', 'Sort a list in place, optionally by a custom comparator function'],
    ['sorted(list)', 'Return a new sorted list, leaving the original unchanged'],
    ['reverse(list)', 'Reverse a list in place'],
    ['length(list)', 'Number of items'],
    ['min_of(list) / max_of(list) / sum_of(list)', 'Smallest, largest, and total'],
    ['index_of(value, list)', 'Position of the first match'],
    ['count_in(value, list)', 'How many times a value appears'],
    ['value IN list', 'TRUE if value appears anywhere in the list'],
    ['clear(list)', 'Remove every item'],
    ['extend(list, other_list)', 'Append every item from another list'],
    ['SLICE list FROM start TO end INTO new_var', 'A new list holding that range; original unchanged']]

  },
  { type: 'code', code: 'SET nums TO LIST OF 5, 2, 8, 1, 9\nshow(MIN_OF(nums))\nshow(MAX_OF(nums))\nsort(nums)\nshow(nums)' },
  { type: 'h3', text: 'Maps' },
  { type: 'p', text: 'A map holds values under named keys and is always mutable, however it was built: created with fields up front, or added/updated/removed later at runtime.' },
  {
    type: 'code',
    code: 'SET person TO MAP WITH name AS "Ama", age AS 25\nshow(name OF person)\nmap_set(person, "city", "Accra")\nshow(person)'
  },
  {
    type: 'table',
    rows: [
    ['key OF map', 'Read a value by a statically-known key name'],
    ['map_set(map, key_expr, value)', 'Add or update an entry. Key is a general expression, so it can be computed at runtime'],
    ['remove(map, key)', 'Delete an entry'],
    ['keys(map) / values(map)', 'A list of every key / value, in insertion order'],
    ['has_key(map, key)', 'TRUE if the key exists'],
    ['length(map)', 'Entry count'],
    ['clear(map)', 'Remove every entry']]

  },
  {
    type: 'note',
    text: 'A bare identifier means different things in the two key positions: age OF person treats age as a literal field name, while map_set(person, age, 31) treats age as a variable whose value becomes the key.'
  },
  { type: 'h3', text: 'Sets' },
  { type: 'p', text: 'A UNIQUE_LIST behaves like a list that never keeps duplicates. Iteration order is not guaranteed.' },
  {
    type: 'code',
    code: 'SET tags TO UNIQUE_LIST OF "urgent", "billing", "urgent"\nshow(length(tags))',
    output: '2'
  },
  {
    type: 'table',
    rows: [
    ['add(unique_list, value)', 'Adds a value; a no-op if already present'],
    ['remove(unique_list, value)', 'Removes a value; a friendly error if it isn\'t present'],
    ['value IN unique_list', 'Membership test'],
    ['length(unique_list) / clear(unique_list)', 'Item count / empty in place']]

  },
  {
    type: 'note',
    text: 'Stacks, queues, linked lists, binary trees, and heaps live in their own Advanced Data Structures page under the Standard Library, since reaching for one of those is specifically about a real Big-O difference from a plain LIST.'
  }]

},
{
  slug: 'data-science-inspection',
  title: 'Data Science: Inspection, Statistics & Cleaning',
  description: 'Summary statistics, dropping missing/duplicate rows, filling gaps, and casting a column\'s type.',
  blocks: [
  {
    type: 'p',
    text: 'This is the first tier of Erilang\'s data science toolkit: inspecting a loaded table, computing real statistics on it, and cleaning it up, all built directly on LOAD/FILTER/describe(...). It splits into two shapes on purpose: a compute-and-return operation is an expression, extending the existing "<X> OF <Y>" idiom; a dataset-transforming operation is a dedicated, non-mutating INTO statement, matching LOAD/FILTER\'s own shape.'
  },
  { type: 'h3', text: 'MEAN / MEDIAN / MODE / STD / VARIANCE / STATS OF' },
  {
    type: 'p',
    text: 'Each is a contextual keyword, recognized only immediately before OF (an ordinary identifier everywhere else). <column> is a bare, unquoted column name; <dataset> is any expression evaluating to a DATASET. Every one reports NONE, not a raw NaN, when there\'s nothing to compute from. MODE is the one that also works on non-numeric columns.'
  },
  {
    type: 'code',
    code: 'LOAD "sales.csv" INTO sales\nSET avg TO MEAN OF units IN sales\nshow(avg)',
    runnable: false,
    runNote: NEEDS_CSV_NOTE
  },
  {
    type: 'p',
    text: 'STATS OF returns every basic summary statistic at once, as a MAP: {mean, median, std, min, max, q1, q3}.'
  },
  {
    type: 'code',
    code: 'LOAD "sales.csv" INTO sales\nSET s TO STATS OF units IN sales\nshow(mean OF s)',
    runnable: false,
    runNote: NEEDS_CSV_NOTE
  },
  { type: 'h3', text: 'COLUMNS / SHAPE OF' },
  {
    type: 'p',
    text: 'The same contextual-keyword/expression treatment, describing the dataset as a whole rather than one column: COLUMNS OF returns a LIST of column-name STRINGs, in order; SHAPE OF returns a MAP {rows, columns}.'
  },
  {
    type: 'code',
    code: 'LOAD "sales.csv" INTO sales\nshow(COLUMNS OF sales)\nshow(SHAPE OF sales)',
    runnable: false,
    runNote: NEEDS_CSV_NOTE
  },
  { type: 'h3', text: 'DROP MISSING / DROP DUPLICATES' },
  {
    type: 'p',
    text: 'DROP MISSING FROM <dataset> INTO <result> drops every row with a missing value in any column. DROP DUPLICATES FROM <dataset> INTO <result> drops exact duplicate rows. Neither mutates the original.'
  },
  {
    type: 'code',
    code: 'LOAD "sales.csv" INTO sales\nDROP MISSING FROM sales INTO clean_sales\nshow(SHAPE OF clean_sales)',
    runnable: false,
    runNote: NEEDS_CSV_NOTE
  },
  { type: 'h3', text: 'FILL MISSING' },
  {
    type: 'p',
    text: 'FILL MISSING IN <dataset> WITH MEAN / MEDIAN INTO <result> fills every numeric column\'s missing values with that column\'s own mean/median, leaving non-numeric columns untouched. FILL MISSING IN <dataset> WITH VALUE <value> INTO <result> fills every column uniformly with one literal value.'
  },
  {
    type: 'code',
    code: 'LOAD "sales.csv" INTO sales\nFILL MISSING IN sales WITH MEAN INTO filled\nshow(SHAPE OF filled)',
    runnable: false,
    runNote: NEEDS_CSV_NOTE
  },
  { type: 'h3', text: 'CAST COLUMN' },
  {
    type: 'p',
    text: 'CAST COLUMN <name> OF <dataset> AS "NUMBER"/"STRING"/"BOOLEAN" INTO <result> converts one column\'s values. A missing value always stays missing regardless of target type. This is a deliberate guard, since casting a missing value to "STRING" would otherwise silently produce the literal text "nan", and to "BOOLEAN" would silently produce TRUE.'
  },
  {
    type: 'code',
    code: 'LOAD "sales.csv" INTO sales\nCAST COLUMN units OF sales AS "STRING" INTO stringified\nshow(type_of(stringified))',
    runnable: false,
    runNote: NEEDS_CSV_NOTE
  }]

},
{
  slug: 'data-science-transform',
  title: 'Data Science: Transforming, Grouping & Joining',
  description: 'Computing a new column per row, GROUP BY/AGGREGATE, sorting, and joining two datasets.',
  blocks: [
  { type: 'h3', text: 'ADD COLUMN' },
  {
    type: 'p',
    text: 'ADD COLUMN <name> TO <dataset> AS <expression> INTO <result> computes a new column, one value per row. The expression may reference this row\'s own columns via <column> OF THIS, the same THIS already used as a CLASS method\'s implicit receiver, reused here for "the implicit context in this row" rather than a new reserved word.'
  },
  {
    type: 'code',
    code: 'LOAD "sales.csv" INTO sales\nADD COLUMN total TO sales AS (units OF THIS) * (price OF THIS) INTO with_total\nshow(COLUMNS OF with_total)',
    runnable: false,
    runNote: NEEDS_CSV_NOTE
  },
  { type: 'h3', text: 'GROUP ... BY / AGGREGATE' },
  {
    type: 'p',
    text: 'GROUP <dataset> BY <column>, ... INTO <grouped> produces a GROUPED_DATASET, not itself a DATASET, and useful for nothing except AGGREGATE, which turns it back into a real one: one row per group, plus one new column per aggregation clause. <FUNC> is SUM, MEAN, MEDIAN, COUNT, MIN, MAX, or STD.'
  },
  {
    type: 'code',
    code: 'LOAD "sales.csv" INTO sales\nGROUP sales BY region INTO grouped\nAGGREGATE grouped WITH SUM OF units AS total_units, MEAN OF price AS avg_price INTO summary\nshow(summary)',
    runnable: false,
    runNote: NEEDS_CSV_NOTE
  },
  { type: 'h3', text: 'SORT' },
  {
    type: 'p',
    text: 'SORT <name> BY <column> [ASCENDING/DESCENDING] INTO <result> defaults to ASCENDING. <name> here must be a bare variable name (not a general expression), which is what disambiguates this statement from the pre-existing sort(list) function call. The result\'s row index is freshly reset, since a sort fundamentally redefines row order.'
  },
  {
    type: 'code',
    code: 'LOAD "sales.csv" INTO sales\nSORT sales BY units DESCENDING INTO sorted_sales\nshow(sorted_sales)',
    runnable: false,
    runNote: NEEDS_CSV_NOTE
  },
  { type: 'h3', text: 'JOIN' },
  {
    type: 'p',
    text: 'SQL-style prefix: INNER / LEFT / RIGHT / OUTER JOIN <dataset1> WITH <dataset2> ON <key> INTO <result>. A bare JOIN with no prefix defaults to INNER, matching SQL\'s own convention. The result\'s row index is freshly reset, for the same reason SORT\'s is.'
  },
  {
    type: 'code',
    code: 'LOAD "sales.csv" INTO sales\nLOAD "regions.csv" INTO regions\nINNER JOIN sales WITH regions ON region_id INTO joined\nshow(SHAPE OF joined)',
    runnable: false,
    runNote: NEEDS_CSV_NOTE
  }]

},
{
  slug: 'data-science-charts',
  title: 'Data Science: Accessible Visualization',
  description: 'CHART and describe_chart: a real image and a genuine, data-computed spoken description, together, always.',
  blocks: [
  {
    type: 'p',
    text: 'This is one of Erilang\'s most distinctive features. A chart here is never just an image: CHART always produces both a real image file and a genuine, data-driven spoken-language description of what the numbers actually show. It is computed directly from the underlying data, never from the rendered picture itself, so it is exactly as reliable for someone who cannot see the image as for someone who can.'
  },
  {
    type: 'code',
    code: 'CHART <dataset> BY <x_column> SHOWING <y_column> AS "LINE"/"BAR"/"SCATTER" TO "<path>" INTO <chart>\nCHART <dataset> SHOWING <column> AS "HISTOGRAM" TO "<path>" INTO <chart>\ndescribe_chart(<chart>)',
    runnable: false,
    runNote: 'This is the general shape of the statement, not a runnable program on its own.'
  },
  {
    type: 'p',
    text: 'TO "<path>" is required directly on CHART itself, not a separate save step. There is no way to end up with a CHART value and no image file on disk. The description text is computed once, in that same statement; describe_chart(<chart>) only ever prints what is already there.'
  },
  {
    type: 'code',
    code: 'LOAD "monthly_revenue.csv" INTO sales\nCHART sales BY month SHOWING revenue AS "LINE" TO "trend.png" INTO chart\ndescribe_chart(chart)',
    output: 'This line chart shows revenue over month, starting at 120 and ending at 355, an increase of 196%. The trend is generally upward. The highest point is 355 at month Jul; the lowest is 120 at month Jan. The largest single change is between month Mar and month Apr, rising by 82.',
    runnable: false,
    runNote: NEEDS_CSV_NOTE
  },
  {
    type: 'p',
    text: 'Every chart also defaults to a colorblind-safe, high-contrast palette for whoever does look at the rendered image. The description text is the real accessibility mechanism, but the picture is never an afterthought either.'
  },
  { type: 'h3', text: 'What each chart type actually describes' },
  {
    type: 'table',
    columns: ['Type', 'Real statistics in the description']!,
    rows: [
    ['LINE', 'Trend direction from a real regression slope (classified against the overall Y range, not a bare sign check); start-to-end value and percent change; the peak and trough with their own x position; the single largest step-to-step change.'],
    ['BAR', 'Highest and lowest bar by name and value; every bar in dataset order (or the top 5 by value past 8 bars); a relative-magnitude callout when one bar dominates. If the x column repeats a label, meaning the data was not GROUPed/AGGREGATEd first, it says so explicitly, since raw ungrouped data can otherwise sound self-contradictory.'],
    ['SCATTER', 'Pearson correlation coefficient, described qualitatively (strong/moderate/weak/no clear, positive/negative) against fixed thresholds, plus each axis\'s own range. Both columns must be numeric.'],
    ['HISTOGRAM', 'Mean, median, and standard deviation; skew direction; which bin holds the most values, by its own range.']]

  },
  {
    type: 'note',
    text: "HISTOGRAM gets its own grammar shape, with no BY clause, since a histogram shows the distribution of one column, and forcing an x-column parameter on it would be required but meaningless."
  },
  {
    type: 'code',
    code: 'LOAD "test_scores.csv" INTO scores\nCHART scores SHOWING score AS "HISTOGRAM" TO "distribution.png" INTO chart\ndescribe_chart(chart)',
    runnable: false,
    runNote: NEEDS_CSV_NOTE
  },
  {
    type: 'p',
    text: "Rendered through Erilang's own charting engine, forced into headless mode so it never needs a real display. Erilang scripts routinely run with no display at all, this project's own test suite included."
  }]

},
{
  slug: 'data-science-inference',
  title: 'Data Science: Statistical Inference',
  description: 'Real hypothesis testing and correlation, plus normalization for a future ML phase.',
  blocks: [
  {
    type: 'p',
    text: "The fourth tier: T_TEST, ANOVA, and CORRELATION are expressions, joining STATS OF's own compute-and-return family, and nothing here transforms a DATASET. NORMALIZE COLUMN and STANDARDIZE COLUMN do transform a column, so they match CAST COLUMN's statement shape instead. Every p-value here comes from Erilang's own trusted statistics engine, the standard, correct source, rather than a hand-reimplemented distribution."
  },
  { type: 'h3', text: 'T_TEST' },
  {
    type: 'p',
    text: 'T_TEST COMPARING <column> IN <dataset1>, <column> IN <dataset2> runs Welch\'s two-sample t-test (does not assume equal variance, the safer modern default). Returns a MAP: {t_statistic, p_value, is_significant, mean_a, mean_b}. Each group is typically already sitting exactly where a prior FILTER put it.'
  },
  {
    type: 'code',
    code: 'FILTER sales WHERE region == "East" INTO east\nFILTER sales WHERE region == "West" INTO west\nSET result TO T_TEST COMPARING units IN east, units IN west\nshow(is_significant OF result)',
    runnable: false,
    runNote: NEEDS_CSV_NOTE
  },
  { type: 'h3', text: 'ANOVA' },
  {
    type: 'p',
    text: 'ANOVA COMPARING <column> IN <dataset1>, <column> IN <dataset2>, ... runs a one-way ANOVA across 2 or more groups. Returns a MAP: {f_statistic, p_value, is_significant}.'
  },
  { type: 'h3', text: 'CORRELATION' },
  {
    type: 'p',
    text: 'CORRELATION BETWEEN <column1>, <column2> IN <dataset> runs a Pearson correlation, returning both the coefficient and its own significance. Returns a MAP: {r, p_value, is_significant}.'
  },
  {
    type: 'p',
    text: 'is_significant on all three uses the conventional p < 0.05 threshold throughout.'
  },
  { type: 'h3', text: 'NORMALIZE COLUMN / STANDARDIZE COLUMN' },
  {
    type: 'p',
    text: 'NORMALIZE COLUMN <name> IN <dataset> INTO <result> min-max scales a column to [0, 1]. STANDARDIZE COLUMN <name> IN <dataset> INTO <result> z-score scales it (mean 0, standard deviation 1). Neither mutates the original; a missing value stays missing in the result either way.'
  },
  {
    type: 'code',
    code: 'LOAD "sales.csv" INTO sales\nNORMALIZE COLUMN units IN sales INTO normalized\nshow(SHAPE OF normalized)',
    runnable: false,
    runNote: NEEDS_CSV_NOTE
  }]

},
{
  slug: 'oop',
  title: 'Object-Oriented Programming',
  description: 'Classes with an implicit THIS, Java-style construction, inheritance, data classes, and operator overloading.',
  blocks: [
  {
    type: 'p',
    text: 'CLASS uses an implicit receiver, Kotlin-style, so methods never declare a self/this parameter. THIS is a keyword, valid only inside a method body, referring to the current instance. Construction is deliberately non-magic: every field\'s value comes from its own declared initializer or from CONSTRUCT\'s own body, never from CREATE silently matching argument names to field names.'
  },
  { type: 'h3', text: 'Defining a class' },
  {
    type: 'p',
    text: 'FIELD is singular, one per line, and unrelated to DATA CLASS\'s own plural FIELDS (see Data classes below, a distinct, lightweight, immutable construct). A method needing no parameters of its own needs no WITH clause.'
  },
  {
    type: 'code',
    code: 'CLASS Circle\nFIELD radius\n\nCONSTRUCT WITH radius DO\nSET radius OF THIS TO radius\nEND\n\nDEFINE area DO\nRETURN 3.14159 * (radius OF THIS) * (radius OF THIS)\nEND\nEND\n\nCREATE Circle WITH 5 INTO c\nCALL area ON c INTO result\nshow(result)',
    output: '78.53975'
  },
  { type: 'h3', text: 'Construction: CONSTRUCT, and the real, non-magic rule' },
  {
    type: 'p',
    text: 'With no CONSTRUCT at all, a class gets a real Java-style default constructor: no arguments, running every FIELD\'s own initializer (or leaving it NONE). With an explicit CONSTRUCT, its own WITH <params>, exactly like DEFINE\'s, become the only way to pass values in. CREATE\'s WITH is a plain positional argument list, mapped to CONSTRUCT\'s params by position, never by matching a field name.'
  },
  {
    type: 'code',
    code: 'CLASS Point\nFIELD x AS 0\nFIELD y AS 0\nEND\n\nCREATE Point INTO origin\nshow(x OF origin)',
    output: '0'
  },
  {
    type: 'note',
    text: 'Field initializers (FIELD name AS expr) run first, in declaration order, before CONSTRUCT\'s own body, so CONSTRUCT can read an already-initialized field and adjust it. A field with no initializer starts as NONE.'
  },
  {
    type: 'p',
    text: 'CONSTRUCT runs immediately after every field initializer, still before CREATE\'s own INTO assignment completes, so it can RAISE to reject an invalid instance outright, and nothing gets bound to INTO\'s target at all.'
  },
  { type: 'h3', text: 'Inheritance and SUPER' },
  {
    type: 'p',
    text: 'INHERITS gives real, genuine inheritance. A redefined method overrides the parent\'s. SUPER reaches the parent explicitly. CALL CONSTRUCT ON SUPER [WITH <args>] must be the literal first statement of a subclass\'s own CONSTRUCT (matching Java\'s own rule), and CALL <method> ON SUPER calls the parent\'s version of an overridden method from any method.'
  },
  {
    type: 'code',
    code: 'CLASS Animal\nDEFINE speak DO\nshow("...")\nEND\nEND\n\nCLASS Dog INHERITS Animal\nDEFINE speak DO\nshow("Woof")\nEND\nEND\n\nCREATE Dog INTO d\nCALL speak ON d INTO result',
    output: 'Woof'
  },
  {
    type: 'note',
    text: 'SUPER can never reach a parent\'s PRIVATE members. The same rule PRIVATE enforces everywhere else applies unchanged from a subclass\'s point of view.'
  },
  { type: 'h3', text: 'Every class gets a readable repr for free' },
  {
    type: 'p',
    text: 'show(...) on any CLASS instance with no custom TO_STRING prints a real, generated summary from its actual field values (Circle(radius=5)), never a raw, unreadable default. Define your own TO_STRING method (see below) to fully control this.'
  },
  { type: 'h3', text: 'DESTRUCT and WITH RESOURCE' },
  {
    type: 'p',
    text: 'DESTRUCT DO ... END is deterministic cleanup, independent of garbage collection. It is never triggered by an ordinary CREATE, only by a WITH RESOURCE CREATE <ClassName> ... INTO <var> DO ... END block exiting. Erilang guarantees DESTRUCT runs on normal completion, an uncaught error, or a RETURN/BREAK/CONTINUE jumping out. An error inside the block still triggers DESTRUCT before that error propagates outward. Neither CONSTRUCT nor DESTRUCT is directly callable (CALL CONSTRUCT ON SUPER is the one exception), and WITH RESOURCE on a class with no DESTRUCT anywhere in its own INHERITS chain is a compile-time error.'
  },
  {
    type: 'code',
    code: 'CLASS BankAccount\nFIELD owner\nFIELD balance\n\nCONSTRUCT WITH owner, balance DO\nSET owner OF THIS TO owner\nSET balance OF THIS TO balance\nEND\n\nDESTRUCT DO\nshow("closing " + (owner OF THIS) + "\'s account")\nEND\nEND\n\nWITH RESOURCE CREATE BankAccount WITH "Alice", 100 INTO acct DO\nshow(balance OF acct)\nEND',
    output: '100\nclosing Alice\'s account'
  },
  { type: 'h3', text: 'Data classes' },
  {
    type: 'p',
    text: "A DATA CLASS is a lightweight, immutable data holder, Kotlin-style, with real immutability enforced underneath. It uses its own, still-plural FIELDS syntax and gets equality, a readable repr, and immutability for free (attempting SET <field> OF <instance> TO ... raises a friendly error pointing at COPY). DATA CLASS construction is still positional, in field declaration order, never field AS value pairs."
  },
  {
    type: 'code',
    code: 'DATA CLASS Point\nFIELDS x, y\nEND\n\nCREATE Point WITH 1, 2 INTO p1\nCOPY p1 WITH y AS 99 INTO p2\nshow(x OF p2)\nshow(y OF p2)',
    output: '1\n99'
  },
  {
    type: 'note',
    text: 'DATA CLASS does not support INHERITS, manual DEFINEs, or CONSTRUCT. Use a regular CLASS if you need any of those.'
  },
  { type: 'h3', text: 'Private and static members' },
  {
    type: 'p',
    text: "A field or method marked PRIVATE can only be used from inside that class's own methods, reached only through THIS. This is checked once at compile time, not enforced at runtime. A field or method marked STATIC belongs to the class itself rather than to any one instance, is shared by every instance, and is reached via <name> OF <ClassName> instead of an instance. A STATIC method takes no implicit THIS at all, and using THIS inside one is a compile-time error."
  },
  {
    type: 'code',
    code: 'CLASS Counter\nSTATIC FIELD total AS 0\nDEFINE increment DO\nSET total OF Counter TO (total OF Counter) + 1\nEND\nEND\n\nCREATE Counter INTO c1\nCREATE Counter INTO c2\nCALL increment ON c1 INTO r1\nCALL increment ON c2 INTO r2\nshow(total OF Counter)',
    output: '2'
  },
  {
    type: 'p',
    text: 'PRIVATE CONSTRUCT blocks CREATE <ClassName> from anywhere outside that class\'s own methods. It\'s the classic no-external-instantiation pattern for a singleton exposed only through a public STATIC factory method.'
  },
  { type: 'h3', text: 'Custom iteration (ITERATE)' },
  {
    type: 'p',
    text: 'A method named exactly ITERATE (not EACH, since that word is already reserved inside FOR EACH\'s own grammar) makes a class usable directly in FOR EACH. It takes no parameters and returns whatever should be iterated, almost always a LIST built up inside the method.'
  },
  { type: 'h3', text: 'Operator overloading' },
  {
    type: 'p',
    text: 'A method named exactly ADD, SUBTRACT, MULTIPLY, DIVIDE, MODULO, POWER, EQUALS, GREATER_THAN, LESS_THAN, GREATER_OR_EQUAL, or LESS_OR_EQUAL is recognized as an operator overload, so +, ==, and the rest dispatch to it natively on instances. EQUALS alone also makes != correct for free.'
  },
  {
    type: 'code',
    code: 'CLASS Point\nFIELD x\nFIELD y\n\nCONSTRUCT WITH x, y DO\nSET x OF THIS TO x\nSET y OF THIS TO y\nEND\n\nDEFINE ADD WITH other DO\nSET new_x TO (x OF THIS) + (x OF other)\nSET new_y TO (y OF THIS) + (y OF other)\nCREATE Point WITH new_x, new_y INTO result\nRETURN result\nEND\nEND\n\nCREATE Point WITH 1, 2 INTO p1\nCREATE Point WITH 3, 4 INTO p2\nSET p3 TO p1 + p2\nshow(x OF p3)\nshow(y OF p3)',
    output: '4\n6'
  },
  { type: 'h3', text: 'String conversion (TO_STRING)' },
  {
    type: 'p',
    text: 'A method named exactly TO_STRING controls how an instance renders as text everywhere that happens. show(...), TO_STRING(...), FORMAT, and + string concatenation all automatically respect a custom TO_STRING the moment it exists. Without one, every class still gets the auto-generated summary described above.'
  },
  {
    type: 'code',
    code: 'CLASS Circle\nFIELD radius\n\nCONSTRUCT WITH radius DO\nSET radius OF THIS TO radius\nEND\n\nDEFINE TO_STRING DO\nRETURN "Circle(r=" + TO_STRING(radius OF THIS) + ")"\nEND\nEND\n\nCREATE Circle WITH 5 INTO c\nshow(c)',
    output: 'Circle(r=5)'
  }]

},
{
  slug: 'interfaces',
  title: 'Interfaces',
  description: 'A compile-time contract check: this class claims to support Shape but forgot perimeter.',
  blocks: [
  {
    type: 'p',
    text: 'Erilang has no static type system, so an interface here is a narrower, still useful thing: a compile-time method-contract check, catching a missing method at build time instead of only when some caller eventually reaches it at runtime.'
  },
  {
    type: 'code',
    code: 'INTERFACE Shape\nDEFINE area\nDEFINE perimeter\nEND\n\nCLASS Square IMPLEMENTS Shape\nFIELD side\n\nCONSTRUCT WITH side DO\nSET side OF THIS TO side\nEND\n\nDEFINE area DO\nRETURN (side OF THIS) * (side OF THIS)\nEND\nDEFINE perimeter DO\nRETURN 4 * (side OF THIS)\nEND\nEND\n\nCREATE Square WITH 4 INTO s\nCALL area ON s INTO a\nshow(a)',
    output: '16'
  },
  {
    type: 'p',
    text: 'IMPLEMENTS accepts a comma-separated list, so a class can honor more than one interface at once, since an interface carries no implementation to conflict over. Checked once at compile time: every declared method must exist, matching by name and parameter count, either directly on the class or inherited through its INHERITS chain. A class missing one or more required methods is rejected with a friendly error listing everything missing at once.'
  },
  {
    type: 'code',
    code: 'INTERFACE Shape\nDEFINE area\nDEFINE perimeter\nEND\n\nCLASS Square IMPLEMENTS Shape\nFIELD side\nCONSTRUCT WITH side DO\nSET side OF THIS TO side\nEND\nDEFINE area DO\nRETURN (side OF THIS) * (side OF THIS)\nEND\nEND',
    output: "Syntax error: CLASS Square IMPLEMENTS Shape but doesn't fully satisfy it — missing: perimeter (with 0 parameters)."
  },
  {
    type: 'note',
    text: 'INTERFACE has no runtime representation at all, like EXPORT. It exists purely as a compile-time contract, with nothing underneath at runtime. There is no ABSTRACT CLASS either: INTERFACE (a pure contract) and INHERITS (real implementation sharing) already cover the two things an abstract class usually blends together.'
  }]

},
{
  slug: 'annotations',
  title: 'Annotations',
  description: '@Route("/status")-style metadata, plus two names with real compile-time or lint behavior.',
  blocks: [
  {
    type: 'p',
    text: 'Written directly above a CLASS, a DEFINE/ASYNC DEFINE (including CONSTRUCT/DESTRUCT), or a FIELD declaration. An annotation name is never reserved and is pure, inert metadata by default, the foundation any future framework (a web router reading @Route("/path")) can build on.'
  },
  {
    type: 'code',
    code: 'CLASS Handlers\n@Route("/status")\nDEFINE status_handler DO\nRETURN "ok"\nEND\nEND\n\nshow(ANNOTATIONS OF status_handler ON Handlers)'
  },
  {
    type: 'p',
    text: 'ANNOTATIONS OF <name> reads back the annotations on a CLASS or top-level DEFINE; ANNOTATIONS OF <method> ON <ClassName> reads them off one specific method. Evaluates to a LIST of MAP: {"name": ..., "argument": ... or NONE}, one per @Annotation line, in declaration order.'
  },
  { type: 'h3', text: '@Override' },
  {
    type: 'p',
    text: 'A real compile-time check: the annotated method must genuinely override an existing method somewhere in its own INHERITS chain, same name, same parameter count, checked up the whole ancestor chain, not just the immediate parent.'
  },
  {
    type: 'code',
    code: 'CLASS Shape\nDEFINE area DO\nRETURN 0\nEND\nEND\n\nCLASS Circle INHERITS Shape\nFIELD radius\nCONSTRUCT WITH radius DO\nSET radius OF THIS TO radius\nEND\n\n@Override\nDEFINE area DO\nRETURN 3.14159 * (radius OF THIS) * (radius OF THIS)\nEND\nEND\n\nCREATE Circle WITH 5 INTO c\nCALL area ON c INTO a\nshow(a)',
    output: '78.53975'
  },
  { type: 'h3', text: '@Deprecated' },
  {
    type: 'p',
    text: '@Deprecated / @Deprecated("use <replacement> instead") is a real erilang lint warning at every statement-form CALL/AWAIT CALL naming the annotated function or method. It is purely static, with no runtime cost, and no compile-time error.'
  },
  {
    type: 'code',
    code: '@Deprecated("use area instead")\nDEFINE old_area_calc WITH r DO\nRETURN 3.14159 * r * r\nEND\n\nCALL old_area_calc WITH 2 INTO legacy_result',
    output: "erilang lint: 'old_area_calc' is a deprecated function (use area instead) and shouldn't be called from here.",
    runnable: false,
    runNote: 'This output is what erilang lint reports on this file. It is not printed by running the program, which the sandbox otherwise runs fine.'
  }]

},
{
  slug: 'error-handling',
  title: 'Error Handling',
  description: 'Try and catch, custom RAISE-able error types, and assertions.',
  blocks: [
  { type: 'h3', text: 'Try and catch' },
  {
    type: 'code',
    code: 'TRY\nSET result TO 10 / 0\nCATCH ERROR INTO e\nshow("Something went wrong: " + message OF e)\nEND',
    output: 'Something went wrong: Division by zero.'
  },
  {
    type: 'p',
    text: 'message OF e is a plain-language description; type OF e is a short category (FileNotFound, DivisionByZero, IndexOutOfRange, MissingField, TypeMismatch, or UnknownError). This only ever catches runtime errors, never the parser\'s own compile-time syntax errors.'
  },
  { type: 'h3', text: 'Custom errors' },
  {
    type: 'p',
    text: 'A class declared CLASS ... INHERITS ERROR is a real, RAISE-able, CATCH-able error type of its own, an ordinary class in every other way (FIELDs, DEFINE methods, CONSTRUCT). RAISE deliberately kept the older named-field syntax (RAISE <ClassName> WITH <field> AS <value>, ...) even though CREATE moved to positional, since it is pure control flow, like RETURN, with no INTO. Because of that, the class needs a CONSTRUCT whose own parameter names match the field names RAISE passes.'
  },
  {
    type: 'code',
    code: 'CLASS InvalidScoreError INHERITS ERROR\nFIELD message\n\nCONSTRUCT WITH message DO\nSET message OF THIS TO message\nEND\nEND\n\nDEFINE validate_score WITH score DO\nIF score < 0 DO\nRAISE InvalidScoreError WITH message AS "Score cannot be negative"\nEND\nEND\n\nTRY\nCALL validate_score WITH -5 INTO ignored\nCATCH ERROR INTO e\nshow(message OF e)\nshow(type OF e)\nEND',
    output: 'Score cannot be negative\nInvalidScoreError'
  },
  {
    type: 'note',
    text: 'type OF <caught error> (a field read on the caught MAP) and type_of(<value>) (general introspection) are unrelated things that share a word on purpose. The former asks "what kind of error was this", the latter "what Erilang type is this value". An uncaught RAISE gets the same friendly top-level reporting as any other uncaught error, never a raw traceback.'
  },
  { type: 'h3', text: 'Assertions' },
  {
    type: 'p',
    text: 'assert(condition[, message]) checks that something you believe to be true genuinely is, raising the real built-in AssertionFailed (catchable the same way as any other error) if it is not. <message> defaults to "Assertion failed." when omitted.'
  },
  { type: 'code', code: 'SET balance TO 100\nassert(balance >= 0, "Balance should never go negative")' },
  {
    type: 'note',
    text: 'assert is recognized structurally by text ("assert" immediately followed by "("), not resolved as a bound-name function call. This keeps it working reliably as a real, callable check rather than colliding with a reserved word.'
  }]

},
{
  slug: 'enums-constants',
  title: 'Enums and Constants',
  description: 'Fixed named sets of values, and values that can never be reassigned.',
  blocks: [
  { type: 'h3', text: 'Enums' },
  {
    type: 'p',
    text: 'An enum defines a fixed, named set of possible values, reached by dot access exactly like a library namespace. Each member is one singleton value; type_of(Status.Active) reports the enum\'s own name ("Status"), matching how a class instance reports its own class name, while type_of(Status) (the enum itself) reports "ENUM".'
  },
  {
    type: 'code',
    code: 'ENUM Status\nPending, Active, Closed\nEND\n\nSET current TO Status.Active\nIF current == Status.Active DO\nshow("It is active")\nEND',
    output: 'It is active'
  },
  {
    type: 'note',
    text: 'ENUM is a contextual keyword, so SET enum TO 5 still works; only ENUM immediately followed by a name opens a declaration. Members carry no associated data of their own, just a fixed set of distinct named values.'
  },
  { type: 'h3', text: 'Constants' },
  {
    type: 'p',
    text: 'As introduced in Language Basics, CONST creates a value that can never be reassigned, in either direction. A name already used as a constant cannot become an ordinary variable, and a name already used as an ordinary variable cannot become a constant, checked once at compile time across the whole scope regardless of source order.'
  }]

},
{
  slug: 'modules-packages',
  title: 'Modules and Packages',
  description: 'Splitting code across files, controlling what is shared, and publishing packages.',
  blocks: [
  { type: 'h3', text: 'Splitting code across files' },
  {
    type: 'p',
    text: 'INCLUDE "<path>" AS <namespace> brings in another file, making every top-level name it defines, functions and plain values alike, reachable as <namespace>.<name>. There is no flat/wildcard import. <path> resolves relative to the directory of the file containing the INCLUDE, never the current working directory, and circular includes are caught as a normal compile-time error naming the cycle.'
  },
  {
    type: 'code',
    code: '# helpers.eri\nDEFINE calculate_total WITH price, units DO\nRETURN price * units\nEND\n\n# main.eri\nINCLUDE "helpers.eri" AS helpers\nshow(helpers.calculate_total(9.99, 3))',
    runnable: false,
    runNote: MULTI_FILE_NOTE
  },
  { type: 'h3', text: 'Controlling what is shared' },
  {
    type: 'p',
    text: 'By default, everything in an included file is reachable from outside it. Adding an EXPORT line to a file limits what is actually available through its namespace to only the names listed, keeping the rest as private, internal detail. A file with no EXPORT at all keeps the original, fully open behavior. This is purely additive and opt-in.'
  },
  {
    type: 'code',
    code: 'EXPORT calculate_total, format_report',
    runnable: false,
    runNote: 'This line only makes sense inside the helpers.eri file above. It is a fragment, not a program on its own.'
  },
  { type: 'h3', text: 'Packages' },
  {
    type: 'p',
    text: 'A larger, reusable piece of code can be published as its own installable package, with an erilang.toml manifest describing its name, version, and dependencies. See Package Manager in the Tooling section for the full picture, including how INCLUDE reaches an installed package by a bare name.'
  },
  {
    type: 'code',
    code: 'erilang search <package name>\nerilang install <package name>',
    runnable: false,
    runNote: 'These are terminal commands, not Erilang source.'
  }]

},
{
  slug: 'namespaces',
  title: 'Namespaces',
  description: 'Grouping many files into one logical namespace, independent of INCLUDE.',
  blocks: [
  {
    type: 'p',
    text: 'INCLUDE links in one specific file. NAMESPACE / USE NAMESPACE is a separate mechanism for when a library\'s functions naturally split across several files but callers just want one merged surface, useful when math_ops.eri and string_ops.eri should both feel like one utils namespace to whoever uses them.'
  },
  {
    type: 'p',
    text: 'NAMESPACE <dotted.name> must be a file\'s very first statement (mirroring Java\'s own package declaration), marking that file as one member of the dotted namespace. Any number of files anywhere in the project can declare the same NAMESPACE name. USE NAMESPACE "<dotted.name>" AS <alias> then pulls in the merged EXPORTed contents of every file declaring it, reached as <alias>.<name>.'
  },
  {
    type: 'code',
    code: '# math_ops.eri\nNAMESPACE shop.utils\nEXPORT apply_tax\n\nDEFINE apply_tax WITH price, rate DO\nRETURN price + (price * rate)\nEND\n\n# label_ops.eri\nNAMESPACE shop.utils\nEXPORT format_label\n\nDEFINE format_label WITH name DO\nRETURN name\nEND\n\n# main.eri\nUSE NAMESPACE "shop.utils" AS utils\n\nSET price TO utils.apply_tax(20, 0.08)\nSET label TO utils.format_label("Widget")\nshow(price)\nshow(label)',
    runnable: false,
    runNote: MULTI_FILE_NOTE
  },
  {
    type: 'note',
    text: 'Every file that declares NAMESPACE must also use EXPORT. Unlike a plain INCLUDEd file, USE NAMESPACE needs a concrete, statically known public name list from each member to merge them and catch a name two different files both claim to export, which is itself a compile-time error rather than silent last-wins.'
  },
  {
    type: 'p',
    text: 'A NAMESPACE-bearing file can still be INCLUDEd directly by itself if only that one file\'s contents are wanted. The two mechanisms don\'t interact. Circular USE NAMESPACE is detected the same way circular INCLUDE is: a normal syntax error naming the cycle, never a raw recursion error.'
  }]

},
{
  slug: 'async',
  title: 'Asynchronous Programming',
  description: 'ASYNC DEFINE and AWAIT, real non-blocking sleep, and running several calls concurrently with GATHER.',
  blocks: [
  {
    type: 'p',
    text: 'A function marked ASYNC DEFINE can be awaited, allowing other asynchronous work to make progress while it runs. This is genuinely useful for network-bound work like the net/socket libraries, where waiting on a response is where async actually pays for itself. No erilang run event-loop wrapper is needed: every top-level script stays ordinary and synchronous, and Erilang bridges into its async runtime automatically wherever AWAIT is used.'
  },
  {
    type: 'code',
    code: 'ASYNC DEFINE fetch_value WITH n DO\nRETURN n * 2\nEND\n\nAWAIT CALL fetch_value WITH 5 INTO result\nshow(result)',
    output: '10'
  },
  { type: 'p', text: 'A class method can also be marked ASYNC DEFINE and awaited through the usual method-call form.' },
  {
    type: 'code',
    code: 'CLASS Fetcher\nASYNC DEFINE get_data WITH n DO\nRETURN n + 100\nEND\nEND\n\nCREATE Fetcher INTO f\nAWAIT CALL get_data ON f WITH 5 INTO result\nshow(result)',
    output: '105'
  },
  {
    type: 'note',
    text: 'AWAIT only ever makes sense on a genuinely ASYNC DEFINEd call. Awaiting a plain function or a value that already ran synchronously is a friendly, catchable error naming what it actually got, not a raw internal failure.'
  },
  { type: 'h3', text: 'Real non-blocking sleep' },
  {
    type: 'p',
    text: 'AWAIT time.sleep_async(<seconds>) is genuinely non-blocking, backed by Erilang\'s own async runtime, unlike plain time.sleep(<seconds>) (a real blocking call that also stalls anything else scheduled on the same loop, including other items in a GATHER).'
  },
  { type: 'h3', text: 'Running calls concurrently: GATHER' },
  {
    type: 'p',
    text: 'GATHER AWAIT <expr1>, AWAIT <expr2>, ... INTO <results> runs 2 or more ASYNC DEFINE calls concurrently on one shared event loop, unlike ordinary sequential AWAITs (each of which spins up and tears down its own fresh loop outside an ASYNC DEFINE body). <results> is a LIST of each call\'s return value in call order, not completion order.'
  },
  {
    type: 'code',
    code: 'ASYNC DEFINE fetch_page WITH url DO\nAWAIT time.sleep_async(1)\nRETURN url\nEND\n\nGATHER AWAIT fetch_page("a"), AWAIT fetch_page("b"), AWAIT fetch_page("c") INTO pages\nshow(pages)',
    output: "['a', 'b', 'c']"
  },
  {
    type: 'note',
    text: 'Known limitation: the synchronous bridge can\'t start a second event loop inside one that\'s already running, so a plain (non-ASYNC) function that uses AWAIT can\'t be reached from inside an ASYNC DEFINE\'s own call chain. Make that function ASYNC DEFINE too. This surfaces as a friendly, catchable error, never a raw internal crash.'
  }]

},
{
  slug: 'files-data',
  title: 'Working with Files and Data',
  description: 'Reading and writing files, loading and filtering tabular data, streaming CSV, databases, and JSON.',
  blocks: [
  { type: 'h3', text: 'Reading and writing text files' },
  {
    type: 'code',
    code: 'WRITE "Hello from Erilang" TO FILE "notes.txt"\nREAD FILE "notes.txt" INTO content\nshow(content)',
    runnable: false,
    runNote: NEEDS_LOCAL_FS_NOTE
  },
  {
    type: 'p',
    text: 'READ BYTES FROM FILE / WRITE BYTES ... TO FILE are the binary counterparts. Every form guarantees the file always closes properly, even if an error happens partway through.'
  },
  { type: 'h3', text: 'Loading tabular data' },
  { type: 'p', text: 'LOAD reads a CSV file into a DATASET, ready for the whole Data Science section of this guide.' },
  {
    type: 'code',
    code: 'LOAD "sales.csv" INTO sales\nDESCRIBE sales\nFILTER sales WHERE units > 50 INTO big_sales\nFOR EACH deal IN big_sales DO\nshow(deal)\nEND',
    runnable: false,
    runNote: NEEDS_CSV_NOTE
  },
  { type: 'h3', text: 'CSV files directly' },
  {
    type: 'code',
    code: 'SET rows TO LIST OF MAP WITH name AS "Ama", age AS 25\ncsv_write("people.csv", rows)\nSET loaded TO csv_read("people.csv")\nshow(loaded)',
    runnable: false,
    runNote: NEEDS_LOCAL_FS_NOTE
  },
  {
    type: 'note',
    text: 'A value read back from a CSV file always comes back as text. Convert it back with TO_NUMBER if you need to do arithmetic with it. csv_write\'s header is the union of every row\'s keys, not just the first row\'s, so heterogeneous rows still write sensibly.'
  },
  { type: 'h3', text: 'True streaming with csv_stream' },
  {
    type: 'p',
    text: 'For a file too large to comfortably load into one LIST first, FOR EACH <row> IN csv_stream(<path>) DO ... END reads one row at a time, lazily, as FOR EACH asks for the next one. A missing file is reported immediately at the csv_stream(...) call, not deferred to the loop\'s first iteration.'
  },
  {
    type: 'code',
    code: 'SET total TO 0\nFOR EACH record IN csv_stream("huge_file.csv") DO\nSET total TO total + TO_NUMBER(amount OF record)\nEND\nshow(total)',
    runnable: false,
    runNote: NEEDS_CSV_NOTE
  },
  { type: 'h3', text: 'Working with a database' },
  {
    type: 'code',
    code: 'SET db TO db_open("mydata.db")\ndb_execute(db, "CREATE TABLE users (id INTEGER, name TEXT)")\ndb_execute(db, "INSERT INTO users VALUES (?, ?)", LIST OF 1, "Ama")\nSET results TO db_query(db, "SELECT * FROM users")\nshow(results)\ndb_close(db)',
    runnable: false,
    runNote: NEEDS_LOCAL_FS_NOTE
  },
  {
    type: 'note',
    text: 'Always pass values through the question-mark placeholders shown above, rather than building the query text by joining strings together. This keeps user-provided data safely separated from the query itself, structurally, not just by convention.'
  },
  {
    type: 'p',
    text: 'Every connection auto-commits by default. For explicit multi-statement atomicity, db_begin_transaction(db) / db_commit(db) / db_rollback(db) hold several statements together as one unit. db_execute_many(db, query, params_list) is a far more efficient batch insert than calling db_execute once per row.'
  },
  {
    type: 'code',
    code: 'db_begin_transaction(db)\ndb_execute(db, "UPDATE accounts SET balance = balance - ? WHERE id = ?", LIST OF 50, 1)\ndb_execute(db, "UPDATE accounts SET balance = balance + ? WHERE id = ?", LIST OF 50, 2)\ndb_commit(db)',
    runnable: false,
    runNote: NEEDS_LOCAL_FS_NOTE
  },
  { type: 'h3', text: 'JSON' },
  { type: 'code', code: 'SET data TO MAP WITH name AS "Ama", age AS 25\nSET text TO json.stringify(data)\nshow(text)' }]

},
{
  slug: 'stdlib-core',
  title: 'Standard Library: Core',
  description: 'math, sys, os, time, datetime, json, regex, and convert: pre-built, no INCLUDE required.',
  blocks: [
  {
    type: 'p',
    text: 'A handful of built-in libraries are available in every script with no INCLUDE. These are pre-built namespaces, reached with the same dotted-call syntax an INCLUDEd file\'s own namespace uses. Each covers a deliberately small, commonly needed subset of functionality, not everything imaginable.'
  },
  { type: 'h3', text: 'math' },
  {
    type: 'table',
    rows: [
    ['sqrt(x), power(x, y), abs(x)', 'Square root, exponent, absolute value'],
    ['round(x[, ndigits]), floor(x), ceiling(x), trunc(x)', 'Rounding'],
    ['log(x[, base]), log10(x), log2(x)', 'Logarithms'],
    ['sin(x), cos(x), tan(x), degrees(x), radians(x)', 'Trigonometry'],
    ['pi, e', 'Constants']]

  },
  { type: 'code', code: 'show(math.sqrt(144))\nshow(math.round(7.8))', output: '12.0\n8' },
  { type: 'h3', text: 'sys' },
  {
    type: 'table',
    rows: [
    ['args', 'Command-line arguments, as a LIST'],
    ['exit(code)', 'Exit the process'],
    ['platform, version', 'Runtime info']]

  },
  { type: 'h3', text: 'os' },
  {
    type: 'p',
    text: 'Files, directories, and the surrounding environment: a large namespace covered in full detail in the next section.'
  },
  {
    type: 'table',
    rows: [
    ['get_env(name, default), path_exists(path)', 'Environment and existence checks'],
    ['path_join(...) / join_path(...), path_split(path)', 'Path building (two spellings, same function)'],
    ['is_dir(path) / is_directory(path), is_file(path)', 'Kind checks'],
    ['make_dir(path) / create_directory(path)', 'Create a directory'],
    ['delete_file(path) / remove_file(path), delete_directory(path)', 'Delete (directory deletion is recursive)'],
    ['copy_file(src, dst), move_file(src, dst)', 'Copies or moves a file, preserving its metadata'],
    ['find_files(dir, pattern)', 'Glob search, e.g. "**/*.csv" for every match at any depth'],
    ['file_size(path), file_modified_time(path)', 'Bytes; a raw Unix timestamp'],
    ['walk_directory(path)', 'Every file and subdirectory at every depth, as one flat LIST'],
    ['create_temp_file() / create_temp_directory()', 'Auto-removed automatically when the script exits'],
    ['is_symlink(path), create_symlink(target, link)', 'Symlink handling'],
    ['compare_files(path1, path2)', 'Real byte-for-byte content comparison']]

  },
  { type: 'h3', text: 'time and datetime' },
  {
    type: 'p',
    text: 'time.now() gives the current moment as a raw Unix timestamp, exactly what duration arithmetic needs, but not human-readable on its own. For "what time is it right now, as text a person can read", reach for datetime.format_now() instead.'
  },
  {
    type: 'table',
    rows: [
    ['time.now(), time.sleep(seconds), time.elapsed_since(start), time.monotonic()', 'Raw timing'],
    ['datetime.now(), today(), utc_now()', 'Current moment (utc_now is timezone-aware)'],
    ['datetime.format(dt, pattern), format_now([pattern])', 'Familiar pattern-based formatting; format_now defaults to "YYYY-MM-DD HH:MM:SS"'],
    ['datetime.parse(text, pattern)', 'Familiar pattern-based parsing'],
    ['datetime.add_days/add_hours/add_minutes(dt, n)', 'Date arithmetic'],
    ['datetime.difference_in_days(dt1, dt2), weekday(dt)', 'Comparing dates; "Monday".."Sunday"'],
    ['datetime.year/month/day/hour/minute(dt)', 'Component extraction']]

  },
  { type: 'code', code: 'show(datetime.format_now())\nSET later TO datetime.add_days(datetime.now(), 7)' },
  { type: 'h3', text: 'json' },
  { type: 'table', rows: [['json.parse(text)', 'STRING → LIST/MAP/NUMBER/STRING/BOOLEAN/NONE'], ['json.stringify(value)', 'Any value → STRING']] },
  { type: 'h3', text: 'regex' },
  { type: 'p', text: 'A dedicated regular expressions engine. It gets its own detail in Regular Expressions below.' },
  {
    type: 'table',
    rows: [
    ['regex.match(pattern, string)', 'BOOLEAN, TRUE if found anywhere in the string'],
    ['regex.extract(pattern, string)', 'First match\'s groups: a MAP (named groups), LIST (unnamed), STRING (no groups), or NONE'],
    ['regex.replace(pattern, string, replacement)', 'Every match replaced, returns a STRING']]

  },
  {
    type: 'code',
    code: 'SET text TO "2024-03-15"\nSET parts TO regex.extract("(?P<year>\\d+)-(?P<month>\\d+)-(?P<day>\\d+)", text)\nshow(year OF parts)',
    output: '2024'
  },
  { type: 'h3', text: 'convert and casting' },
  { type: 'p', text: 'TO_NUMBER, TO_STRING, TO_BOOLEAN convert a value from one type to another, as covered in Data Types. convert.to_number(...)/to_string(...)/to_boolean(...) are the exact same functions, namespaced.' }]

},
{
  slug: 'stdlib-networking',
  title: 'Standard Library: Networking',
  description: 'HTTP, raw sockets (sync and async), and UDP.',
  blocks: [
  { type: 'h3', text: 'HTTP: net' },
  {
    type: 'p',
    text: 'net.get/net.post return a real response object, not a MAP wrapper. .text, .status_code, .headers are all reachable through the same <field> OF <container> syntax MAP/class instances use. get_json/post_json skip straight to the already-parsed body.'
  },
  {
    type: 'code',
    code: 'SET response TO net.get("https://example.com")\nSET body TO text OF response\nSET code TO status_code OF response\nshow(code)',
    runnable: false,
    runNote: "This makes a real outbound HTTP request, which the sandbox blocks entirely. It works normally when run locally."
  },
  { type: 'h3', text: 'Email: smtp' },
  { type: 'p', text: 'smtp.send(to, subject, body, server, port, username, password) and smtp.send_with_attachment(...) send real email over SMTP.' },
  { type: 'h3', text: 'Raw sockets: socket' },
  {
    type: 'p',
    text: 'A formal SOCKET type. Client: socket.create(), connect(sock, host, port), send(sock, data), receive(sock), close(sock). Server: bind(sock, host, port), listen(sock[, backlog]), accept(sock). accept blocks until a client connects, then returns a new socket for that one connection. socket.get_peer_address(sock) reads a connected socket\'s remote {host, port} fresh from the OS, on either side of a connection.'
  },
  {
    type: 'code',
    code: 'SET server TO socket.create()\nsocket.bind(server, "127.0.0.1", 9423)\nsocket.listen(server, 5)\nSET client TO socket.accept(server)\nSET message TO socket.receive(client)\nsocket.send(client, "echo: " + message)',
    runnable: false,
    runNote: BLOCKS_FOREVER_NOTE
  },
  { type: 'h3', text: 'Async socket server' },
  {
    type: 'p',
    text: 'socket.run_server(port, handler[, host]) is genuinely concurrent, since every accepted connection runs as its own independent task on Erilang\'s async runtime. handler must be ASYNC DEFINE, called once per connection with a CONNECTION; inside it, AWAIT socket.receive_async(connection)/send_async(connection, data)/close_async(connection) do the actual I/O. run_server closes the connection itself once the handler returns or raises.'
  },
  {
    type: 'code',
    code: 'ASYNC DEFINE handle_client WITH connection DO\nSET data TO AWAIT socket.receive_async(connection)\nAWAIT socket.send_async(connection, "echo: " + data)\nEND\n\nsocket.run_server(8765, handle_client)',
    runnable: false,
    runNote: BLOCKS_FOREVER_NOTE
  },
  { type: 'h3', text: 'UDP: udp' },
  {
    type: 'p',
    text: 'A genuinely separate namespace from socket.*, not a protocol flag. UDP has no listen/accept, and every send/receive needs an explicit destination/origin per datagram. udp.create()/bind/send_to/receive_from/close mirror the sync socket.* tier; udp.receive_from returns {data, host, port} in one call, since UDP has no fixed peer to query separately. A formal UDP_SOCKET type. Calling a TCP-only function on it (or vice versa) is a clear, friendly error.'
  },
  {
    type: 'code',
    code: 'SET sock TO udp.create()\nudp.bind(sock, "127.0.0.1", 9099)\nSET result TO udp.receive_from(sock)\nudp.send_to(sock, "echo: " + (data OF result), host OF result, port OF result)\nudp.close(sock)',
    runnable: false,
    runNote: BLOCKS_FOREVER_NOTE
  },
  {
    type: 'p',
    text: 'udp.run_server(port, handler[, host]) mirrors the async TCP server, but handler is called as handler(data, sender) once per datagram (there is no persistent connection to read from repeatedly). AWAIT udp.send_async(sender, data) replies to that datagram\'s own origin.'
  }]

},
{
  slug: 'stdlib-web',
  title: 'Standard Library: Web Framework',
  description: 'A real, concurrent HTTP server built on the same architecture as the async socket server.',
  blocks: [
  {
    type: 'p',
    text: 'web.create_app()/route(app, method, path, handler)/response(status, body[, headers])/run_app(app, port[, host]) are built directly on socket.run_server\'s architecture, since a genuinely concurrent HTTP server is really just a genuinely concurrent TCP server with an HTTP format on the wire. A deliberate first slice: exact-path and {param} routing only, no static files, middleware, cookies, or WebSocket support.'
  },
  {
    type: 'code',
    code: 'SET app TO web.create_app()\n\nASYNC DEFINE handle_greet WITH request DO\nSET who TO name OF (params OF request)\nRETURN web.response(200, "Hello, " + who + "!")\nEND\n\nweb.route(app, "GET", "/greet/{name}", handle_greet)\nweb.run_app(app, 8080)',
    runnable: false,
    runNote: BLOCKS_FOREVER_NOTE
  },
  {
    type: 'p',
    text: 'handler must be ASYNC DEFINE, taking one request MAP: {method, path, headers, query, body, params}. A request matching no route gets a 404; a handler that raises gets a 500. Either way the server keeps running, unaffected, the same "one failure doesn\'t take the whole thing down" guarantee socket.run_server gives per connection.'
  }]

},
{
  slug: 'stdlib-hashing',
  title: 'Standard Library: Hashing',
  description: 'General-purpose hashing and password hashing are two different tools. Never use one for the other\'s job.',
  blocks: [
  {
    type: 'p',
    text: 'Fast hashing is exactly what makes brute-forcing a stolen password database practical, so password hashing needs the opposite property: deliberately slow, adaptive algorithms. The two are named far enough apart here that reaching for the wrong one is a visible mismatch, not a silent, easy-to-miss mistake.'
  },
  { type: 'h3', text: 'General-purpose hashing' },
  {
    type: 'p',
    text: 'For file integrity, checksums, cache keys, and deduplication, never passwords. <algorithm> defaults to "sha256"; also accepts sha1/sha224/sha384/sha512/md5.'
  },
  {
    type: 'table',
    rows: [
    ['hash(value[, algorithm])', 'Returns a hex-digest STRING'],
    ['verify_hash(value, digest[, algorithm])', 'Re-hashes and compares'],
    ['hmac_hash(value, key[, algorithm])', 'Keyed hashing, proves a message came from someone holding key']]

  },
  {
    type: 'code',
    code: 'SET checksum TO hash("some file contents")\nSET ok TO verify_hash("some file contents", checksum)\nshow(ok)',
    output: 'True'
  },
  { type: 'h3', text: 'Password hashing' },
  {
    type: 'p',
    text: 'hash_password(password) / verify_password(password, stored_hash) use PBKDF2-HMAC-SHA256 with a fresh cryptographically random salt per call and 600,000 iterations (current OWASP guidance). hash_password returns one self-contained STRING, "pbkdf2_sha256$600000$<salt>$<hash>", a well-known convention, so nothing needs tracking separately, and verify_password compares with a constant-time comparison so the check itself can\'t leak timing information.'
  },
  {
    type: 'code',
    code: 'SET stored TO hash_password("a secret password")\nshow(verify_password("a secret password", stored))',
    output: 'True'
  }]

},
{
  slug: 'stdlib-bytes',
  title: 'Standard Library: Byte/Binary Data',
  description: 'The BYTES type, encoding, binary-protocol packing, bitwise ops, and mutable byte buffers.',
  blocks: [
  {
    type: 'p',
    text: 'BYTES is a formal type produced by READ BYTES FROM FILE or built directly with bytes.* functions. show(...) always renders it safely regardless of content: a byte count and a truncated hex preview, never a raw dump.'
  },
  { type: 'h3', text: 'Encoding' },
  {
    type: 'table',
    rows: [
    ['bytes.to_bytes(string[, encoding]) / to_string(bytes[, encoding])', 'STRING ⇄ BYTES, defaulting to "utf-8"'],
    ['bytes.base64_encode(bytes) / base64_decode(string)', 'For embedding binary data in text (JSON, URLs, ...)'],
    ['bytes.hex_encode(bytes) / hex_decode(string)', 'e.g. "68656c6c6f"'],
    ['bytes.byte_length(bytes)', 'Encoded byte count, not character count'],
    ['bytes.concat_bytes(bytes1, bytes2, ...)', 'Join any number of BYTES values']]

  },
  {
    type: 'code',
    code: 'SET data TO bytes.to_bytes("hello", "utf-8")\nSET encoded TO bytes.base64_encode(data)\nshow(encoded)',
    output: 'aGVsbG8='
  },
  { type: 'h3', text: 'Binary-protocol packing' },
  {
    type: 'p',
    text: "bytes.pack_bytes(format, value1, ...) / bytes.unpack_bytes(format, bytes) take format as a comma-separated STRING of readable type names (int8/uint8, int16/uint16, int32/uint32, int64/uint64, float32, float64), not cryptic single-letter codes. Always big-endian, unpadded, the portable default for file formats and protocols."
  },
  {
    type: 'code',
    code: 'SET b TO bytes.pack_bytes("int32,float32", 42, 3.5)\nSET values TO bytes.unpack_bytes("int32,float32", b)\nshow(values)'
  },
  { type: 'h3', text: 'Bitwise operations and checksums' },
  {
    type: 'table',
    rows: [
    ['bytes.bit_and/bit_or/bit_xor(a, b)', 'On NUMBER, truncated to a whole number first'],
    ['bytes.bit_shift_left/bit_shift_right(value, positions)', 'Shifting'],
    ['bytes.crc32_checksum(bytes)', 'Standard CRC-32 checksum']]

  },
  { type: 'h3', text: 'Mutable byte buffers' },
  {
    type: 'p',
    text: 'For building BYTES up incrementally rather than concatenating repeatedly. A buffer is still a real, ordinary BYTES value everywhere else. There is no separate "finalize" step, but set_byte_at only works on a buffer specifically, since an ordinary BYTES value (from bytes.to_bytes, say) is immutable.'
  },
  {
    type: 'code',
    code: 'SET buf TO bytes.create_byte_buffer(3)\nbytes.set_byte_at(buf, 1, 72)\nbytes.set_byte_at(buf, 2, 73)\nbytes.set_byte_at(buf, 3, 33)\nshow(bytes.to_string(buf))',
    output: 'HI!'
  }]

},
{
  slug: 'stdlib-archives',
  title: 'Standard Library: Compression & Archives',
  description: 'zip and tar: creating, extracting, inspecting, and appending.',
  blocks: [
  {
    type: 'p',
    text: 'One bare function per concrete format. <file_list> is a LIST of paths, each stored under its own basename, never its full path, so an archive never leaks source directory structure.'
  },
  {
    type: 'table',
    rows: [
    ['zip_create(path, file_list[, compression_level])', 'Create a .zip'],
    ['zip_extract(path, destination)', 'Extract everything'],
    ['tar_create(path, file_list[, compression_level])', 'Picks plain .tar or gzip .tar.gz/.tgz from the extension'],
    ['tar_extract(path, destination)', 'Extract everything'],
    ['list_archive_contents(path)', 'Names, without extracting'],
    ['extract_specific_files(path, file_list, to)', 'Only the named entries'],
    ['add_file_to_archive(path, new_file)', 'Append without recreating; .zip or plain .tar only, not compressed .tar.gz']]

  },
  {
    type: 'code',
    code: 'SET files TO LIST OF "notes.txt", "data.csv"\nzip_create("backup.zip", files)',
    runnable: false,
    runNote: NEEDS_LOCAL_FS_NOTE
  }]

},
{
  slug: 'stdlib-data-structures',
  title: 'Standard Library: Advanced Data Structures',
  description: 'Stack, queue, linked list, binary tree, and heap, for when the Big-O of a specific structure matters.',
  blocks: [
  {
    type: 'p',
    text: 'data_structures.* goes beyond LIST/MAP/UNIQUE_LIST, with genuine node-based (linked list, binary tree) or deque-backed (stack, queue) implementations, not built on top of LIST, since the whole point of reaching for one is a real Big-O difference LIST would defeat.'
  },
  {
    type: 'table',
    rows: [
    ['create_stack() / push(stack, v) / pop(stack)', 'LIFO. pop raises a friendly error if empty'],
    ['create_queue() / enqueue(queue, v) / dequeue(queue)', 'FIFO. dequeue raises a friendly error if empty'],
    ['peek(stack_or_queue)', 'Looks at the next value pop/dequeue would remove, without removing it'],
    ['create_linked_list() / append_node / prepend_node / to_list', 'prepend_node is O(1), unlike a LIST\'s own insert-at-front'],
    ['create_binary_tree() / insert_node / in_order', 'A plain BST (not self-balancing). in_order gives a sorted LIST'],
    ['create_heap() / push_heap / pop_heap', 'A plain LIST underneath, kept in heap order. pop_heap always returns the smallest value']]

  },
  {
    type: 'code',
    code: 'SET s TO data_structures.create_stack()\ndata_structures.push(s, 1)\ndata_structures.push(s, 2)\nshow(data_structures.pop(s))',
    output: '2'
  },
  {
    type: 'code',
    code: 'SET bt TO data_structures.create_binary_tree()\ndata_structures.insert_node(bt, 5)\ndata_structures.insert_node(bt, 3)\ndata_structures.insert_node(bt, 8)\nshow(data_structures.in_order(bt))',
    output: '[3, 5, 8]'
  }]

},
{
  slug: 'stdlib-random',
  title: 'Standard Library: Randomness & Identifiers',
  description: 'Random values, reproducible seeding for data science, sampling, and UUIDs.',
  blocks: [
  {
    type: 'table',
    rows: [
    ['random_number(min, max)', 'Inclusive both ends; whole or fractional matching how min/max were written'],
    ['random_choice(list)', 'One item from a non-empty LIST'],
    ['shuffle(list)', 'Reorders in place, returns NONE'],
    ['generate_uuid()', 'A random (version 4) UUID as a STRING'],
    ['random_sample(list, count)', 'count distinct items, no repeats. An error if count exceeds the list\'s length'],
    ['weighted_random_choice(list, weights)', 'One item, where weights[i] is list[i]\'s relative likelihood']]

  },
  {
    type: 'code',
    code: 'SET population TO LIST OF "red", "blue", "green"\nSET sample TO random_sample(population, 2)\nshow(sample)'
  },
  { type: 'h3', text: 'Reproducibility' },
  {
    type: 'p',
    text: 'set_random_seed(value) makes every subsequent call to random_number, random_choice, shuffle, random_sample, and weighted_random_choice deterministic together, since they all draw from the one shared random state it seeds. This is critical for reproducible data science and ML work.'
  },
  {
    type: 'code',
    code: 'set_random_seed(42)\nSET a TO random_number(1, 100)\nshow(a)'
  }]

},
{
  slug: 'stdlib-run-command',
  title: 'Standard Library: Running External Programs',
  description: 'run_command: arguments as a list, never a shell string, by design.',
  blocks: [
  {
    type: 'p',
    text: 'run_command(<command_list>[, <timeout>][, <env>]) takes the program and its arguments as separate LIST entries, run with no shell in between. This is the only form offered, deliberately: a single command string would need a shell to split it into arguments, and a shell re-parses metacharacters spliced into that string, the classic shell-injection shape. With list arguments, each entry reaches the program exactly as written.'
  },
  {
    type: 'code',
    code: 'SET result TO run_command(LIST OF "echo", "hello from erilang")\nshow(stdout OF result)\nshow(exit_code OF result)',
    output: 'hello from erilang\n\n0'
  },
  {
    type: 'p',
    text: 'Always returns a MAP {stdout, stderr, exit_code}. A non-zero exit_code does not raise on its own. <timeout> (seconds) actually kills a hanging process; <env> is a MAP of extra/overriding variables merged on top of the current process\'s own environment, not replacing it.'
  }]

},
{
  slug: 'stdlib-cli-args',
  title: 'Standard Library: Command-Line Argument Parsing',
  description: 'get_arg, has_arg, and a stateless usage-text generator.',
  blocks: [
  {
    type: 'p',
    text: 'get_arg(name[, default][, required][, type]) reads --name value or --name=value directly from the command line, no separate parse step. has_arg(name) checks presence only.'
  },
  {
    type: 'code',
    code: 'SET port TO get_arg("port", "8080")\nSET verbose TO has_arg("verbose")\nshow(port)',
    output: '8080'
  },
  {
    type: 'p',
    text: '<required> (a BOOLEAN) raises a friendly, immediate error if the argument is missing entirely, rather than pressing on with NONE and crashing confusingly later. <type> ("STRING"/"NUMBER"/"BOOLEAN") casts the raw text. "BOOLEAN" accepts true/1/yes and false/0/no, and a bare --name with no value is TRUE specifically for a BOOLEAN-typed argument.'
  },
  {
    type: 'code',
    code: 'SET port TO get_arg("port", NONE, TRUE, "NUMBER")',
    runnable: false,
    runNote: 'This intentionally raises when --port isn\'t supplied on the command line. It\'s a real (required) missing-argument demo, not something to run in the sandbox without arguments.'
  },
  {
    type: 'p',
    text: 'generate_help_text(arg_descriptions) is deliberately stateless. It reads only the LIST of MAP descriptions it is given (each with name required, type/required/description optional), not an implicit registry built from earlier get_arg calls, so it works in any order, including as the very first thing a script does.'
  }]

},
{
  slug: 'stdlib-image',
  title: 'Standard Library: Image Handling',
  description: 'Load, transform, and pixel-edit images with a real image processing engine.',
  blocks: [
  {
    type: 'p',
    text: 'A new IMAGE type, always kept internally as RGBA regardless of the source file\'s own mode, giving one consistent {r, g, b, a} shape everywhere a color is read or written.'
  },
  {
    type: 'table',
    rows: [
    ['image.load_image(path) / save_image(image, path)', 'Format guessed from the extension; .jpg/.jpeg auto-saves a plain-RGB copy'],
    ['image.resize_image(image, w, h) / crop_image(image, l, t, r, b)', 'Both return a new IMAGE; crop uses top-left origin, right/bottom exclusive'],
    ['image.rotate_image(image, degrees)', 'Expands the canvas so nothing clips at the corners'],
    ['image.apply_filter(image, name)', '"blur"/"sharpen"/"edge_enhance" (real image filters) or "grayscale"'],
    ['image.get_pixel(image, x, y) / set_pixel(image, x, y, color)', 'set_pixel mutates in place, matching append/push elsewhere'],
    ['image.get_image_size(image)', '{width, height}']]

  },
  {
    type: 'code',
    code: 'SET img TO image.load_image("photo.png")\nSET resized TO image.resize_image(img, 400, 300)\nSET gray TO image.apply_filter(resized, "grayscale")\nimage.save_image(gray, "photo_gray.png")',
    runnable: false,
    runNote: NEEDS_LOCAL_FS_NOTE
  }]

},
{
  slug: 'stdlib-audio',
  title: 'Standard Library: Audio',
  description: 'File-based editing (audio.*) and real microphone/speaker I/O (mic.*), sharing one AUDIO type.',
  blocks: [
  { type: 'h3', text: 'File-based editing: audio' },
  {
    type: 'p',
    text: "A real audio editing engine. All transforms return a new AUDIO, and the original is untouched. Times are always milliseconds. It shells out to ffmpeg for anything beyond raw WAV."
  },
  {
    type: 'table',
    rows: [
    ['audio.load_audio(path) / save_audio(audio, path)', 'Format guessed from the extension'],
    ['audio.trim_audio(audio, start_ms, end_ms)', 'A new AUDIO for that range'],
    ['audio.concat_audio(a1, a2)', 'Join two clips'],
    ['audio.change_volume(audio, db_change)', 'Adjust volume in decibels'],
    ['audio.apply_fade(audio, fade_in_ms, fade_out_ms)', 'Fade in/out'],
    ['audio.get_audio_duration(audio)', 'Milliseconds']]

  },
  {
    type: 'code',
    code: 'SET a TO audio.load_audio("song.mp3")\nSET intro TO audio.trim_audio(a, 0, 5000)\naudio.save_audio(intro, "intro.mp3")',
    runnable: false,
    runNote: NEEDS_LOCAL_FS_NOTE
  },
  { type: 'h3', text: 'Real-time audio I/O: mic' },
  {
    type: 'p',
    text: 'Talks to real microphone and speaker hardware directly. It is distinct from audio.* in kind, not just name, but bridges into the same AUDIO type both ways: a live recording is immediately usable with every audio.* function.'
  },
  {
    type: 'table',
    rows: [
    ['mic.record_audio(seconds[, sample_rate][, device])', 'Blocks until finished; returns an AUDIO'],
    ['mic.play_audio(audio[, device])', 'Blocks until playback ends'],
    ['mic.list_audio_devices()', 'LIST of MAP {index, name, max_input_channels, max_output_channels}']]

  },
  {
    type: 'code',
    code: 'SET recording TO mic.record_audio(3)\nmic.play_audio(recording)',
    runnable: false,
    runNote: NEEDS_HARDWARE_NOTE
  }]

},
{
  slug: 'stdlib-video',
  title: 'Standard Library: Video Handling',
  description: 'Load, trim, and extract frames from video.',
  blocks: [
  {
    type: 'p',
    text: 'A new VIDEO type. The smallest, most contained slice in this whole batch, deliberately. It shells out to ffmpeg for every real encode/decode, so this is fundamentally a thin wrapper, not a from-scratch engine.'
  },
  {
    type: 'table',
    rows: [
    ['video.load_video(path) / save_video(video, path)', 'save_video re-encodes; can take longer than the clip\'s own runtime'],
    ['video.trim_video(video, start_sec, end_sec)', 'A new VIDEO; times are seconds throughout'],
    ['video.extract_frame(video, time_sec)', 'Returns a real, editable IMAGE; every image.* function works on it directly'],
    ['video.get_video_info(video)', '{duration, fps, width, height}']]

  },
  {
    type: 'code',
    code: 'SET v TO video.load_video("clip.mp4")\nSET thumbnail TO video.extract_frame(v, 1.0)\nimage.save_image(thumbnail, "thumbnail.png")',
    runnable: false,
    runNote: NEEDS_LOCAL_FS_NOTE
  },
  {
    type: 'note',
    text: 'Be honest about performance: this is the heaviest, slowest area in the whole standard library, and needs ffmpeg genuinely installed and on PATH. It is a real system dependency, unlike image.*/audio.*, which mostly don\'t need one.'
  }]

},
{
  slug: 'stdlib-html',
  title: 'Standard Library: Web Scraping (HTML/XML)',
  description: 'Parsing markup with real CSS selectors.',
  blocks: [
  {
    type: 'p',
    text: "One HTML_ELEMENT type covers both a whole parsed document and one matched element within it, since the underlying object model doesn't distinguish the two either."
  },
  {
    type: 'table',
    rows: [
    ['html.parse_html(text) / parse_xml(text)', 'parse_xml is stricter and preserves tag-name case'],
    ['html.find_element(doc, selector)', 'First match, or NONE. A real CSS selector like "div.item"'],
    ['html.find_all_elements(doc, selector)', 'Always a LIST, empty if nothing matches'],
    ['html.get_text(element)', 'Visible text, with nested tags stripped'],
    ['html.get_attribute(element, name)', 'One attribute by name, NONE if absent. Multi-valued (e.g. class) comes back space-joined']]

  },
  {
    type: 'code',
    code: 'SET response TO net.get("https://example.com")\nSET doc TO html.parse_html(text OF response)\nSET heading TO html.find_element(doc, "h1")\nshow(html.get_text(heading))',
    runnable: false,
    runNote: "This needs a real outbound HTTP request, which the sandbox blocks entirely. It works normally when run locally."
  }]

},
{
  slug: 'stdlib-gui',
  title: 'Standard Library: GUI & Drawing Primitives',
  description: 'Real primitives to build a UI toolkit on top of.',
  blocks: [
  {
    type: 'p',
    text: 'The most architecturally significant piece of the whole standard library: not one fixed built-in feature, but window/canvas creation, shapes, color, and keyboard/mouse input as plain functions another developer could build a real toolkit on top of.'
  },
  {
    type: 'p',
    text: "gui.run(window, on_frame[, on_event][, fps]) is a blocking construct that owns its own poll-based event loop internally, deliberately not ASYNC/AWAIT-based, since that loop isn't awaitable. on_frame/on_event are plain functions, called directly each frame/event."
  },
  {
    type: 'code',
    code: 'SET window TO gui.create_window(640, 480, "My Game")\n\nDEFINE on_frame WITH win DO\ngui.clear(win, MAP WITH r AS 20, g AS 20, b AS 30)\ngui.draw_circle(win, 320, 240, 20, MAP WITH r AS 255, g AS 100, b AS 0)\nIF gui.is_key_pressed(win, "escape") DO\nRETURN FALSE\nEND\nRETURN TRUE\nEND\n\ngui.run(window, on_frame)',
    runnable: false,
    runNote: NEEDS_DISPLAY_NOTE
  },
  {
    type: 'table',
    rows: [
    ['draw_rect / draw_circle / draw_line / draw_polygon(window, ..., color[, filled])', 'Filled by default; FALSE for outline only'],
    ['draw_text(window, text, x, y, color[, size])', 'Text drawing'],
    ['draw_image(window, image, x, y)', 'Draws a real IMAGE, no conversion step'],
    ['get_mouse_position(window) / is_key_pressed(window, key_name)', 'Polled input'],
    ['clear(window, color)', 'Colors are a MAP {r, g, b[, a]}, same shape as image.get_pixel']]

  },
  {
    type: 'note',
    text: "Each frame, gui.run translates queued input into a MAP {type, key, x, y, button} for on_event; the loop stops when the window's close button is clicked, or the moment on_frame returns FALSE. One honest limitation: the underlying display is single-window, so a second gui.create_window reconfigures the one global display, not a genuinely independent second window."
  }]

},
{
  slug: 'stdlib-ui-automation',
  title: 'Standard Library: OS Accessibility (UI Automation)',
  description: 'Windows-only read-only desktop inspection and a global key-press listener: a first step toward a screen reader in Erilang.',
  blocks: [
  {
    type: 'p',
    text: "ui_automation.* wraps the Windows UI Automation API, the same underlying system real Windows accessibility tools and UI test automation frameworks build on, and, for on_key_press, the raw low-level keyboard hook. There is no cross-platform accessibility API this could fall back to. On any other platform, or if the required system component isn't available, every function here raises a friendly, catchable error instead of silently doing nothing."
  },
  {
    type: 'table',
    rows: [
    ['ui_automation.list_windows()', 'Every top-level open window, as a LIST of UI_ELEMENT'],
    ['ui_automation.get_focused_element()', 'The UI_ELEMENT with keyboard focus anywhere on the desktop'],
    ['ui_automation.get_window_text(element)', 'A window\'s title, a button\'s label, a field\'s contents'],
    ['ui_automation.list_ui_elements(element)', 'That element\'s direct children (not recursive)'],
    ['ui_automation.on_key_press(callback)', 'callback(key_name) fires once per key press anywhere on the desktop']]

  },
  {
    type: 'code',
    code: 'SET windows TO ui_automation.list_windows()\nSET first_window TO ITEM 1 OF windows\nshow(ui_automation.get_window_text(first_window))',
    runnable: false,
    runNote: "This is Windows-only and needs the desktop UI Automation API, which the sandbox doesn't have. It works normally when run locally on Windows."
  },
  {
    type: 'note',
    text: 'A genuine first slice toward a much larger eventual goal: read-only inspection plus one global key-press listener, no clicking/typing/otherwise controlling another program\'s UI yet, and no macOS or Linux equivalent.'
  }]

},
{
  slug: 'repl',
  title: 'The Interactive Shell (REPL)',
  description: 'Typing statements one at a time and seeing results immediately.',
  blocks: [
  {
    type: 'p',
    text: 'Typing erilang with no file argument (or erilang repl, spelled explicitly) opens the interactive shell, where you type one statement at a time and see the result immediately. It is an excellent way to experiment, test an idea, or explore what a function does before committing it to a saved file. The startup banner (also :help) shows the version, read from Erilang\'s own package manifest, one real source of truth.'
  },
  { type: 'h3', text: 'Everything you type is remembered' },
  {
    type: 'p',
    text: 'Variables, functions, and classes you define stay available for the rest of the session, so you can build up a piece of work gradually across several lines.'
  },
  { type: 'h3', text: 'Bare expressions' },
  {
    type: 'p',
    text: 'Typing an expression on its own line, without wrapping it in show(...), automatically prints its value and stores it in a special variable named _, letting you reuse the last result on the very next line, familiar interactive-console style. A statement like SET or IF keeps its own unrelated behavior and is never auto-printed; a result of NONE prints nothing.'
  },
  {
    type: 'code',
    code: '2 + 2\nshow(_ * 10)',
    output: '4\n40',
    runnable: false,
    runNote: "The automatic _ variable is a feature of the interactive shell itself. It isn't available in a single non-interactive sandbox run."
  },
  { type: 'h3', text: 'Multi-line blocks' },
  {
    type: 'p',
    text: 'A block that spans several lines (IF, WHILE, FOR, DEFINE, CLASS, TRY, DATA CLASS) is gathered automatically until its matching END is entered, shown by a "..." continuation prompt while it is still open, then run as one unit.'
  },
  { type: 'h3', text: 'Exiting' },
  {
    type: 'p',
    text: 'Ctrl+D / Ctrl+Z, or :exit/:quit, end the session. Ctrl+C twice in a row within 2 seconds at the primary prompt also exits; a single Ctrl+C there just warns and returns to the prompt, so one reflexive keypress can\'t end the session by accident. Ctrl+C while a multi-line block is open instead just cancels that one block. Errors never end the session. A bad input prints the same friendly message erilang run would show and returns to the prompt with everything defined so far still intact.'
  },
  { type: 'h3', text: 'A timing trap worth knowing' },
  {
    type: 'p',
    text: 'While a line is genuinely blocked inside input(...), the REPL is not reading a new command. Whatever is typed next is consumed as the answer, statement-shaped or not. Always give input(...) a descriptive prompt so it is obvious you are being asked something.'
  },
  { type: 'h3', text: 'Session commands' },
  {
    type: 'table',
    rows: [
    [':show on / :show off', 'Reveal or hide the underlying compiled code for each line you run'],
    [':help', 'Show the full list of available commands and shortcuts'],
    [':exit / :quit', 'Leave the shell']]

  },
  {
    type: 'note',
    text: 'The REPL is pure, linear, sequential text: a prompt, then output, one line at a time. No color is relied on for meaning, and nothing is redrawn or overwritten in place, so it works cleanly with a screen reader, a deliberate design goal, not an afterthought.'
  }]

},
{
  slug: 'cli-tools',
  title: 'Command-Line Tools',
  description: 'The erilang command and its subcommands.',
  blocks: [
  {
    type: 'table',
    rows: [
    ['erilang run <script.eri>', 'Lex, parse, compile, and execute'],
    ['erilang / erilang repl', 'Open the interactive shell'],
    ['erilang lint <target>', 'Check for likely mistakes, without running it. See Linting'],
    ['erilang format <target>', 'Rewrite into a consistent, standard style. See Formatter'],
    ['erilang doc <target>', 'Generate reference documentation from doc comments. See Documentation Generator'],
    ['erilang install / publish / search / login / register / logout', 'Package manager. See Package Manager']]

  },
  {
    type: 'p',
    text: 'erilang run resolves file paths inside the script (e.g. LOAD "data.csv") relative to the current working directory the command is run from, not the script\'s own location.'
  }]

},
{
  slug: 'linting',
  title: 'Linting',
  description: 'erilang lint: advisory, AST-only static analysis; never blocks a script from running.',
  blocks: [
  {
    type: 'code',
    code: 'erilang lint script.eri     # one file\nerilang lint some_directory  # every .eri file found recursively',
    runnable: false,
    runNote: 'These are terminal commands, not Erilang source.'
  },
  {
    type: 'p',
    text: 'Lexes and parses the target exactly like erilang run, then walks the AST looking for common mistakes, without ever executing anything. Every finding is advisory. Unlike erilang run\'s own compile-time checks (an unsatisfied IMPLEMENTS, bad scoping, ...), nothing lint reports ever blocks a script from running. Exits 0 (with a summary line) when nothing was found, 1 otherwise, safe to wire into CI.'
  },
  { type: 'h3', text: 'Checks' },
  {
    type: 'table',
    rows: [
    ['Unused variables', 'A SET/CONST target never read anywhere in its own scope, including via a nested closure'],
    ['Unreachable code', 'A statement following RETURN/BREAK/CONTINUE in the same block'],
    ['Reserved-word-adjacent naming', 'A name one character away from a contextual keyword (clas for CLASS). Informational, not a spell-checker'],
    ['Unused PRIVATE members', 'A PRIVATE field/method never read, written, or called anywhere in its own class'],
    ['IMPLEMENTS satisfied entirely through inheritance', 'Informational, not wrong, just worth knowing when reading one class in isolation'],
    ['@Deprecated calls', 'Every statement-form CALL/AWAIT CALL naming an @Deprecated function/method']]

  }]

},
{
  slug: 'doc-generator',
  title: 'Documentation Generator',
  description: 'erilang doc: plain Markdown from every top-level CLASS/DEFINE/INTERFACE and its doc comments.',
  blocks: [
  {
    type: 'code',
    code: 'erilang doc script.eri              # one file, writes to ./docs\nerilang doc some_directory -o api-docs  # a whole project, custom output dir',
    runnable: false,
    runNote: 'These are terminal commands, not Erilang source.'
  },
  {
    type: 'p',
    text: 'Walks every top-level CLASS/DEFINE/INTERFACE declaration and its ## doc comments (a DEFINE nested inside another one is implementation detail, not documented as its own entry), producing one Markdown page per source file under <output>/api/ (mirroring the project\'s own directory layout), plus an <output>/index.md linking to every file and every name it declares.'
  },
  {
    type: 'p',
    text: "Each entry shows the full signature (parameter names and default values), PRIVATE/STATIC/ASYNC markers, the doc comment text itself, and, for a CLASS, what it INHERITS/IMPLEMENTS. An INTERFACE's own ## doc comment renders too, even though it has no runtime documentation attribute to attach to otherwise."
  }]

},
{
  slug: 'formatter',
  title: 'Formatter',
  description: 'erilang format: a second, independent AST-to-text renderer producing canonical .eri source.',
  blocks: [
  {
    type: 'code',
    code: 'erilang format script.eri          # prints canonical output to stdout\nerilang format script.eri --write    # -w also works; rewrites the file in place\nerilang format some_directory --check  # reports which files aren\'t canonical, exits 1 if any',
    runnable: false,
    runNote: 'These are terminal commands, not Erilang source.'
  },
  {
    type: 'p',
    text: 'Safe by default, matching the common convention of well-known code formatters in other languages: the bare command never modifies a file. --write/-w rewrites in place; --check reports without writing or printing anything.'
  },
  { type: 'h3', text: 'Canonical style rules' },
  {
    type: 'table',
    rows: [
    ['Indentation', '4 spaces per level, no tabs. ELSE/CATCH sit at the same indent as their opening IF/TRY'],
    ['Keywords', 'Normalized to UPPERCASE'],
    ['Spacing', 'One space around binary operators and infix keywords; none for unary; no space before a comma, one after'],
    ['Parentheses', 'Added only where operator precedence actually requires them to reproduce the same parse tree'],
    ['Blank lines', 'Exactly one forced between top-level declarations and between two methods in a CLASS, regardless of the original']]

  },
  {
    type: 'note',
    text: 'Idempotent by construction: formatting already-canonical source produces no changes. Comments are preserved. Only ## right before a DEFINE/CLASS/INTERFACE has an AST representation of its own; every plain # comment is tracked separately and reinserted by original line number.'
  }]

},
{
  slug: 'package-manager',
  title: 'Package Manager',
  description: 'erilang.toml, erilang.lock, caret versioning, opt-in install hooks, and the registry.',
  blocks: [
  {
    type: 'table',
    rows: [
    ['erilang install', 'Install everything in erilang.toml'],
    ['erilang install <package>[@<constraint>]', 'Add and install a package, optionally at a specific constraint (e.g. foo@^2.1.0)'],
    ['erilang install <package> --allow-hooks[=name1,name2]', 'Explicitly opt in to running that package\'s declared install hook(s)'],
    ['erilang publish', 'Publish the current directory\'s package'],
    ['erilang search <term>', 'Search the registry'],
    ['erilang login / register / logout', 'Registry account management']]

  },
  { type: 'h3', text: 'erilang.toml' },
  {
    type: 'p',
    text: 'A hand-authored manifest, one per package/project: a [package] table (name, version, description, author, license, entry, defaulting to "src/main.eri"), a [dependencies] table using caret (^) version constraints (npm/Cargo-style: ^2.1.0 allows any 2.x.y at or above it, never 3.0.0; ^0.2.1 treats the minor number as the breaking boundary instead), and an optional [hooks] table.'
  },
  { type: 'h3', text: 'erilang.lock' },
  {
    type: 'p',
    text: 'Auto-generated by erilang install, never hand-edited. It records the exact resolved version, download URL, checksum, and dependency list of every direct and transitive dependency, so a later install reproduces the identical set rather than potentially landing on newer versions.'
  },
  { type: 'h3', text: 'One flat version per package, not nested/duplicated versions' },
  {
    type: 'p',
    text: "One version of each package for the whole project, not nested/duplicated versions. Erilang's own INCLUDE model gives every included file one flat namespace in the same process, with no per-package isolated scoping, so resolution fails loudly, naming every conflicting requirer, rather than silently picking one, if no single version satisfies every constraint on a package across the whole dependency graph."
  },
  { type: 'h3', text: 'Install hooks are off by default, always' },
  {
    type: 'p',
    text: "Even a package that declares a hook in its own [hooks] table never runs it unless the installing user explicitly passes --allow-hooks (every declared hook) or --allow-hooks=name1,name2 (only those specific packages). A hook being declared and a hook being trusted are two separate, both-required opt-ins, the same mitigation other modern package managers use against a dependency silently running arbitrary code on install."
  },
  { type: 'h3', text: 'Including an installed package' },
  {
    type: 'p',
    text: 'A bare name with no path separator and no .eri extension resolves against erilang_packages/<name>/, walking upward from the including file\'s own directory (mirroring Node\'s own node_modules walk) to find that folder or an erilang.toml, then reads that package\'s own entry field.'
  },
  {
    type: 'code',
    code: 'INCLUDE "mathlib" AS mathlib\nCALL mathlib.double WITH 21 INTO result',
    runnable: false,
    runNote: 'This needs an actual installed package under erilang_packages/. It works when run locally after erilang install mathlib.'
  },
  { type: 'h3', text: 'The registry' },
  {
    type: 'p',
    text: 'erilang.dev is the one canonical registry (no multi-registry fallback chain, avoiding dependency-confusion attack surface). Package-name ownership: the first successful publish of a name claims it for that account; only that account can publish later versions. Versions are immutable once published (matching npm/Cargo and other modern registries). Republishing an existing name+version is rejected, never overwritten.'
  }]

},
{
  slug: 'style-guide',
  title: 'Style Guide and Best Practices',
  description: 'Naming, calling functions, error handling, secrets, and documentation.',
  blocks: [
  { type: 'h3', text: 'Naming' },
  {
    type: 'p',
    text: 'Use lowercase words separated by underscores for variables and functions (total_score, not TotalScore). Use capitalized words for class and interface names (BankAccount).'
  },
  { type: 'h3', text: 'Choose the clearest form, not the shortest' },
  {
    type: 'p',
    text: 'Erilang deliberately offers two ways to call a function: as its own line with CALL ... WITH ... INTO, and inline with parentheses. Use the standalone form when a call is the entire point of a line, and the inline form when a result needs to feed directly into a larger expression. Neither is more correct than the other, so pick whichever reads better in context.'
  },
  { type: 'h3', text: 'Build classes the explicit way' },
  {
    type: 'p',
    text: 'Give a class an explicit CONSTRUCT whenever it needs values at creation time, with parameter names that read naturally alongside the FIELDs they set. There is no shortcut that infers fields from constructor arguments by name. That is deliberate, since a Java-style, non-magic CONSTRUCT is also what makes a PRIVATE field genuinely private, never settable from outside through CREATE.'
  },
  { type: 'h3', text: 'Prefer errors over silent failure' },
  {
    type: 'p',
    text: 'Use assert to state assumptions directly in your code, and real, named error types (CLASS ... INHERITS ERROR) with RAISE for conditions a caller genuinely needs to recognize and handle. Letting a problem surface clearly, immediately, is almost always better than letting it pass silently and cause confusion somewhere else later.'
  },
  { type: 'h3', text: 'Keep secrets out of source code and hashed correctly' },
  {
    type: 'p',
    text: 'Never hash a password with a general-purpose function such as hash. Always use hash_password, which is specifically designed to resist the kind of brute-force checking a plain hash is vulnerable to.'
  },
  { type: 'h3', text: 'Document as you go' },
  {
    type: 'p',
    text: 'A double-hash comment directly above a function, class, or interface becomes real, structured documentation, automatically picked up by erilang doc. Writing it at the same time you write the code costs almost nothing and saves real effort later.'
  }]

},
{
  slug: 'contextual-keywords',
  title: 'Contextual Keywords',
  description: 'A smaller set of words that are only special in their own specific position. Everything else is a true reserved word.',
  blocks: [
  {
    type: 'p',
    text: 'Most of Erilang\'s grammar words (IF, WHILE, DEFINE, AND, ...) are true reserved words, never usable as a name anywhere. A smaller set of contextual (soft) keywords are special only in the one grammatical shape their own construct needs, and an ordinary identifier everywhere else. Each is recognized by a structural check at the exact point its construct can start.'
  },
  {
    type: 'table',
    columns: ['Word', 'Only special as...'],
    rows: [
    ['ITEM', 'ITEM <index> OF <container>'],
    ['LIST', 'LIST OF <items>'],
    ['MAP', 'MAP WITH <key> AS <value>, ...'],
    ['FORMAT', 'FORMAT "<template>"'],
    ['ERROR', 'CATCH ERROR INTO <var>, INHERITS ERROR'],
    ['DATA', 'DATA CLASS <Name> ... END'],
    ['CLASS', 'CLASS <Name> ... END (immediately followed by a name)'],
    ['ENUM', 'ENUM <Name> ... END'],
    ['GLOBAL', 'GLOBAL <name>, ... (immediately followed by a name)'],
    ['OUTER', 'OUTER <name>, ... or OUTER JOIN ...'],
    ['BYTES', 'READ BYTES FROM FILE ..., WRITE BYTES ... TO FILE ...'],
    ['MEAN / MEDIAN / MODE / STD / VARIANCE / STATS', '<word> OF <column> IN <dataset>'],
    ['COLUMNS / SHAPE', '<word> OF <dataset>'],
    ['DROP / FILL / CAST', 'DROP MISSING/DUPLICATES FROM ..., FILL MISSING IN ..., CAST COLUMN ...'],
    ['MISSING / DUPLICATES / VALUE / COLUMN', 'Immediately after DROP/FILL/WITH/CAST above'],
    ['ADD', 'ADD COLUMN <name> TO <dataset> AS ...'],
    ['GROUP / AGGREGATE', 'GROUP ... BY ... INTO ..., AGGREGATE ... WITH ... INTO ...'],
    ['SORT', 'A bare name immediately followed by BY'],
    ['JOIN / INNER / LEFT / RIGHT', '[INNER/LEFT/RIGHT/OUTER] JOIN ... WITH ... ON ...'],
    ['SUM / COUNT / MIN / MAX', 'Immediately after WITH/, inside AGGREGATE\'s own clause list'],
    ['CHART / SHOWING', 'CHART ... BY/SHOWING ... INTO ...'],
    ['T_TEST / ANOVA / CORRELATION', '<word> COMPARING/BETWEEN ... IN <dataset>'],
    ['COMPARING / BETWEEN', 'Immediately after T_TEST/ANOVA/CORRELATION'],
    ['NORMALIZE / STANDARDIZE', '<word> COLUMN <name> IN <dataset> INTO ...'],
    ['GATHER', 'GATHER AWAIT <expr>, ... (immediately followed by AWAIT)'],
    ['USE', 'USE NAMESPACE "<name>" AS <alias>'],
    ['CONSTRUCT / DESTRUCT', '... DO ... END inside a CLASS body (immediately followed by DO)'],
    ['RESOURCE', 'WITH RESOURCE CREATE ...'],
    ['ANNOTATIONS', 'ANNOTATIONS OF <name>'],
    ['PRIVATE / STATIC', 'Immediately before FIELD/DEFINE inside a CLASS body'],
    ['CASE', 'Inside a WHEN ... DO ... END block']]

  }]

},
{
  slug: 'quick-reference',
  title: 'Quick Reference',
  description: 'A compact reference for core statements and common types, to keep open while you work.',
  blocks: [
  { type: 'h3', text: 'Core statements' },
  {
    type: 'table',
    rows: [
    ['SET x TO value / CONST x TO value', 'Assign a variable / a never-reassigned constant'],
    ['IF ... DO ... ELSE ... END', 'Conditional'],
    ['WHILE ... DO ... END', 'Loop while a condition holds'],
    ['FOR x FROM a TO b [STEP n] [DOWN TO] DO ... END', 'Counting loop'],
    ['FOR EACH x IN collection DO ... END', 'Loop over a DATASET/LIST/UNIQUE_LIST/stream'],
    ['BREAK / CONTINUE', 'Exit or skip a loop iteration'],
    ['WHEN value DO CASE x DO ... END [ELSE ...] END', 'Branch by value (or CASE TYPE "..." by type)'],
    ['DEFINE name [WITH params] DO ... RETURN ... END', 'Function; WITH is optional'],
    ['CALL name [WITH args] [INTO result]', 'Call a function/method as a statement'],
    ['name(args)', 'Call a function inline, as an expression'],
    ['TRY ... CATCH ERROR INTO e ... END', 'Handle errors'],
    ['RAISE ErrorType [WITH field AS value, ...]', 'Raise a custom error (needs a matching CONSTRUCT)'],
    ['assert(condition[, message])', 'Raise AssertionFailed if condition is falsy'],
    ['CLASS Name [INHERITS Parent] [IMPLEMENTS I, ...] ... END', 'Define a class. FIELD is singular'],
    ['CONSTRUCT [WITH params] DO ... END / DESTRUCT DO ... END', 'Construction / deterministic cleanup'],
    ['CREATE Name [WITH args] INTO var', 'Create an instance. Args are positional'],
    ['WITH RESOURCE CREATE Name [WITH args] INTO var DO ... END', 'Guarantees DESTRUCT runs on exit'],
    ['DATA CLASS Name FIELDS f1, f2 END', 'Immutable data holder (plural FIELDS, unlike CLASS)'],
    ['COPY instance WITH field AS value INTO var', 'A modified copy of a DATA CLASS instance'],
    ['INTERFACE Name DEFINE method ... END', 'A compile-time method contract'],
    ['ENUM Name member1, member2 END', 'A fixed set of named values'],
    ['INCLUDE "file" AS namespace / EXPORT names', 'Bring in another file / limit what it shares'],
    ['NAMESPACE dotted.name / USE NAMESPACE "..." AS alias', 'Group many files into one merged namespace'],
    ['ASYNC DEFINE / AWAIT / GATHER AWAIT ..., ... INTO', 'Asynchronous function, call, and concurrent calls'],
    ['LOAD "file.csv" INTO dataset', 'Read a CSV into a DATASET'],
    ['FILTER dataset WHERE col op value INTO result', 'Keep matching rows'],
    ['CHART dataset BY x SHOWING y AS "LINE" TO "path" INTO chart', 'Real image + a spoken description, together']]

  },
  { type: 'h3', text: 'Common types' },
  {
    type: 'table',
    rows: [
    ['NUMBER, STRING, BOOLEAN, NONE, BYTES', 'Core scalar types'],
    ['DATASET', 'A loaded table of data, from LOAD or FILTER'],
    ['LIST OF ... / MAP WITH key AS value, ... / UNIQUE_LIST OF ...', 'Ordered / key-value / no-duplicates collections'],
    ['SOCKET, UDP_SOCKET, CONNECTION, WEB_APP', 'Networking'],
    ['STACK, QUEUE, LINKED_LIST, BINARY_TREE', 'Advanced data structures'],
    ['IMAGE, AUDIO, VIDEO, HTML_ELEMENT, WINDOW, UI_ELEMENT', 'Media and desktop/UI'],
    ['CHART, GROUPED_DATASET, ENUM, NAMESPACE', 'Data science and organization']]

  },
  {
    type: 'note',
    text: 'This guide covers the language as it stands today. Erilang continues to grow, with new capability added deliberately and carefully over time.'
  }]

}];
