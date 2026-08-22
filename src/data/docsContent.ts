export type DocBlockType = 'p' | 'h3' | 'code' | 'table' | 'note';

export interface DocBlock {
  type: DocBlockType;
  text?: string;
  code?: string;
  output?: string;
  columns?: [string, string];
  rows?: [string, string][];
}

export interface DocPage {
  slug: string;
  title: string;
  description: string;
  blocks: DocBlock[];
}

export const docPages: DocPage[] = [
{
  slug: 'introduction',
  title: 'Introduction',
  description: 'What Erilang is, who it is for, and how this guide is organized.',
  blocks: [
  {
    type: 'p',
    text: "Erilang is a general-purpose programming language built around a simple idea: code should read the way you would explain it out loud. Instead of leaning on dense punctuation and symbols, Erilang favors clear, full English keywords for the things that shape a program's structure — conditionals, loops, functions, classes — while everyday actions like showing a value or sorting a list are ordinary function calls, the same way you would use them in any modern language."
  },
  {
    type: 'p',
    text: 'This balance is deliberate. Erilang was designed from the ground up with accessibility in mind, particularly for programmers using screen readers, where a wall of symbols is far harder to follow than a sentence. At the same time, it was built to be a complete, serious language — not a simplified teaching toy. It has real object-oriented programming with inheritance and interfaces, genuine error handling, asynchronous networking, a package ecosystem, and a growing standard library covering everything from databases to image processing to desktop automation.'
  },
  { type: 'h3', text: 'What Erilang is good for' },
  {
    type: 'p',
    text: "Erilang is a genuinely general-purpose language. People use it for data analysis and reporting, backend services and APIs, command-line tools, network programming, working with files and databases, building small games and graphical programs, and automating everyday tasks. If you have written code in Python, JavaScript, or a similar language before, most of Erilang's ideas will feel familiar — the syntax is simply more readable."
  },
  { type: 'h3', text: 'How this guide is organized' },
  {
    type: 'p',
    text: 'The first several chapters form a tutorial: read them in order and you will go from nothing to writing real, useful programs. The later chapters are a reference — each stands on its own, so once you know the basics, you can jump straight to whichever topic you need. The final chapter is a compact quick-reference you can keep open while you work.'
  }]

},
{
  slug: 'getting-started',
  title: 'Getting Started',
  description: 'Write and run your first program, and the two ways to work with Erilang.',
  blocks: [
  { type: 'h3', text: 'Your first program' },
  {
    type: 'p',
    text: 'Erilang programs live in plain text files ending in .eri. Create a file called hello.eri with the following line:'
  },
  { type: 'code', code: 'show("Hello, world!")' },
  { type: 'p', text: 'Run it from a terminal:' },
  { type: 'code', code: 'erilang run hello.eri', output: 'Hello, world!' },
  { type: 'h3', text: 'Two ways to work' },
  {
    type: 'p',
    text: 'You can run a saved .eri file the way you just did, or you can open the interactive shell — simply type erilang at your terminal with no arguments — and type statements one at a time, seeing results immediately. The interactive shell is covered fully in The Interactive Shell (REPL), and it is an excellent way to experiment as you learn.'
  },
  { type: 'h3', text: 'Comments' },
  { type: 'p', text: 'Anything after a # on a line is a comment, ignored when the program runs. Comments are for you and for anyone reading your code later.' },
  {
    type: 'code',
    code: '# This line explains what happens next\nshow("Comments do not affect the program")'
  },
  { type: 'h3', text: 'Documentation comments' },
  {
    type: 'p',
    text: "A comment written with two hashes, immediately before a function, class, or interface, is treated specially — it becomes that item's official description, picked up automatically by documentation tools."
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
    text: "A variable is created and assigned with SET ... TO .... Erilang does not require you to declare a variable's type in advance — a variable can hold a number, text, or any other kind of value, and what it holds can change over time."
  },
  {
    type: 'code',
    code: 'SET age TO 25\nSET name TO "Ama"\nshow(name)\nshow(age)',
    output: 'Ama\n25'
  },
  { type: 'h3', text: 'Constants' },
  {
    type: 'p',
    text: "A constant is declared with CONST ... TO ... instead of SET. Once declared, a constant's value can never be changed — attempting to reassign it is caught immediately, with a clear explanation of why."
  },
  { type: 'code', code: 'CONST max_attempts TO 3\nshow(max_attempts)' },
  {
    type: 'note',
    text: 'Use a constant whenever a value genuinely should never change during the life of your program — a configuration limit, a fixed conversion rate, and so on.'
  },
  { type: 'h3', text: 'Names' },
  {
    type: 'p',
    text: "Names for variables, functions, and classes can use letters, digits, and underscores, and cannot start with a digit. Erilang's own keywords — words like IF, WHILE, and DEFINE — are reserved and cannot be used as names. If you try, Erilang tells you plainly that the word is reserved and suggests an alternative, rather than failing with a cryptic error."
  },
  { type: 'h3', text: 'Printing values' },
  {
    type: 'p',
    text: 'The show(...) function prints a value. It works on any kind of value — numbers, text, lists, and more all display sensibly.'
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
    text: 'Erilang has a full, standard set of operators for arithmetic, comparison, and logic, all combining predictably — multiplication before addition, and so on — exactly as you would expect from ordinary arithmetic. Parentheses can always be used to make grouping explicit.'
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
    text: 'From tightest to loosest binding: unary operators (NOT, unary minus) bind first, then multiplication/division/remainder/exponent, then addition/subtraction, then comparisons, then AND, then OR. When in doubt, parentheses always make intent explicit and are never wrong to add.'
  },
  { type: 'code', code: 'show(2 + 3 * 4) # 14, not 20\nshow((2 + 3) * 4) # 20' }]

},
{
  slug: 'control-flow',
  title: 'Control Flow',
  description: 'Conditionals, loops, breaking and skipping, and branching with pattern matching.',
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
    text: 'For a simple counting loop, FOR ... FROM ... TO is more direct than a manual WHILE. An optional STEP changes the increment, and DOWN TO counts backward.'
  },
  {
    type: 'code',
    code: 'FOR i FROM 1 TO 5 DO\nshow(i)\nEND\n\nFOR i FROM 10 DOWN TO 1 STEP 2 DO\nshow(i)\nEND'
  },
  { type: 'h3', text: 'Iterating over a collection' },
  { type: 'p', text: 'FOR EACH walks through every item in a list or dataset.' },
  {
    type: 'code',
    code: 'SET fruits TO LIST OF "apple", "banana", "cherry"\nFOR EACH fruit IN fruits DO\nshow(fruit)\nEND'
  },
  { type: 'h3', text: 'Breaking and skipping' },
  {
    type: 'p',
    text: 'BREAK exits the nearest enclosing loop immediately. CONTINUE skips the rest of the current pass and moves to the next one. Both only ever affect the loop directly containing them, even when loops are nested inside one another.'
  },
  {
    type: 'code',
    code: 'SET i TO 0\nWHILE i < 10 DO\nSET i TO i + 1\nIF i == 3 DO\nCONTINUE\nEND\nIF i == 6 DO\nBREAK\nEND\nshow(i)\nEND',
    output: '1\n2\n4\n5'
  },
  { type: 'h3', text: 'Pattern matching as branching' },
  {
    type: 'p',
    text: 'For choosing between several fixed possibilities, WHEN ... CASE is often clearer than a long chain of IF/ELSE. See Pattern Matching for the full picture.'
  },
  {
    type: 'code',
    code: 'SET day TO 5\nWHEN day DO\nCASE 6 DO\nshow("Saturday")\nEND\nCASE 7 DO\nshow("Sunday")\nEND\nCASE 5 DO\nshow("Friday, almost the weekend")\nEND\nEND'
  }]

},
{
  slug: 'functions',
  title: 'Functions',
  description: 'Defining and calling functions, default values, multiple returns, closures, and recursion.',
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
    text: 'A function can be called as its own line, capturing the result with INTO — useful when the call is the whole point of that step. It can also be called inline, wherever a value is needed, including nested inside another expression. Both forms are equally valid; use whichever reads more naturally for a given line.'
  },
  {
    type: 'code',
    code: 'CALL square WITH 6 INTO result\nshow(result)\n\n# or, inline:\nshow(square(6) + 1)'
  },
  { type: 'h3', text: 'Default parameter values' },
  {
    type: 'code',
    code: 'DEFINE greet WITH name AS "World" DO\nshow("Hello, " + name)\nEND\n\ngreet()\ngreet("Ama")',
    output: 'Hello, World\nHello, Ama'
  },
  { type: 'h3', text: 'Returning more than one value' },
  {
    type: 'p',
    text: 'A function can hand back several values at once, separated by commas after RETURN. The caller can capture them all in one step, one name per value, again separated by commas.'
  },
  {
    type: 'code',
    code: 'DEFINE analyze WITH n DO\nRETURN n * 2, n * 3\nEND\n\nSET doubled, tripled TO analyze(5)\nshow(doubled)\nshow(tripled)',
    output: '10\n15'
  },
  { type: 'h3', text: 'Nested functions and closures' },
  {
    type: 'p',
    text: "A function can be defined inside another function. The inner function can see and use the outer function's parameters and local variables, even after being called later."
  },
  {
    type: 'code',
    code: 'DEFINE make_adder WITH x DO\nDEFINE add_to_x WITH y DO\nRETURN x + y\nEND\nCALL add_to_x WITH 10 INTO result\nRETURN result\nEND\n\nCALL make_adder WITH 5 INTO total\nshow(total)',
    output: '15'
  },
  { type: 'h3', text: 'Anonymous functions' },
  {
    type: 'p',
    text: 'A small, throwaway function can be written inline without a name, useful for passing a short piece of behavior somewhere else — such as a custom sorting rule.'
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
  }]

},
{
  slug: 'data-types',
  title: 'Data Types',
  description: "Erilang's core value types, and converting between them.",
  blocks: [
  {
    type: 'p',
    text: "Erilang has a small set of core value types. You never have to declare a variable's type in advance — a variable simply holds whatever value it is given, and Erilang tracks what kind of value that is behind the scenes."
  },
  {
    type: 'table',
    columns: ['Form', 'What it does'],
    rows: [
    ['NUMBER', 'Any numeric value, whole or with a decimal point. Erilang treats both the same way.'],
    ['STRING', 'Text, written in double quotes.'],
    ['BOOLEAN', 'TRUE or FALSE.'],
    ['NONE', 'Represents an absent or unknown value.'],
    ['BYTES', 'Raw binary data.'],
    ['DATASET', 'A loaded table of data, as produced by LOAD.']]

  },
  { type: 'h3', text: "Finding out a value's type" },
  {
    type: 'p',
    text: "type_of(value) returns the name of a value's type as text, which is useful when a piece of code needs to behave differently depending on what it was given."
  },
  {
    type: 'code',
    code: 'show(type_of(5))\nshow(type_of("hello"))\nshow(type_of(TRUE))',
    output: 'NUMBER\nSTRING\nBOOLEAN'
  },
  { type: 'h3', text: 'Converting between types' },
  {
    type: 'code',
    code: 'SET text_value TO "42"\nSET number_value TO TO_NUMBER(text_value)\nshow(number_value + 1)\n\nshow(TO_STRING(100))\nshow(TO_BOOLEAN("true"))',
    output: '43\n100\nTRUE'
  },
  { type: 'h3', text: 'Text strings' },
  { type: 'p', text: 'Strings are joined with the plus operator. Special characters can be written using an escape sequence: \\n for a new line and \\t for a tab.' },
  { type: 'code', code: 'SET first TO "Ama"\nSET last TO "Owusu"\nshow(first + " " + last)', output: 'Ama Owusu' }]

},
{
  slug: 'data-structures',
  title: 'Data Structures',
  description: 'Lists, maps, sets, and stacks, queues, linked lists, trees, and heaps.',
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
    type: 'table',
    rows: [
    ['append(list, value)', 'Add a value to the end'],
    ['remove(list, value)', 'Remove the first matching value'],
    ['insert(list, value, position)', 'Insert a value at a given position'],
    ['sort(list)', 'Sort a list in place'],
    ['sorted(list)', 'Return a new sorted list, leaving the original unchanged'],
    ['reverse(list)', 'Reverse a list in place'],
    ['length(list)', 'Number of items'],
    ['min_of(list) / max_of(list) / sum_of(list)', 'Smallest, largest, and total'],
    ['index_of(value, list)', 'Position of the first match'],
    ['count_in(value, list)', 'How many times a value appears'],
    ['value IN list', 'TRUE if value appears anywhere in the list'],
    ['clear(list)', 'Remove every item'],
    ['extend(list, other_list)', 'Append every item from another list']]

  },
  { type: 'code', code: 'SET nums TO LIST OF 5, 2, 8, 1, 9\nshow(MIN_OF(nums))\nshow(MAX_OF(nums))\nsort(nums)\nshow(nums)' },
  { type: 'h3', text: 'Maps' },
  { type: 'p', text: 'A map holds values under named keys and can grow or change after it is created.' },
  {
    type: 'code',
    code: 'SET person TO MAP WITH name AS "Ama", age AS 25\nshow(name OF person)\nSET "city" IN person TO "Accra"\nshow(person)'
  },
  {
    type: 'table',
    rows: [
    ['OF', 'Read a value by key'],
    ['SET IN TO', 'Add or update an entry'],
    ['REMOVE FROM', 'Delete an entry'],
    ['KEYS OF', 'A list of every key'],
    ['VALUES OF', 'A list of every value'],
    ['HAS KEY IN', 'TRUE if the key exists']]

  },
  { type: 'h3', text: 'Sets' },
  { type: 'p', text: 'A UNIQUE_LIST behaves like a list that never keeps duplicates.' },
  {
    type: 'code',
    code: 'SET tags TO UNIQUE_LIST OF "python", "erilang", "python"\nshow(LENGTH OF tags)',
    output: '2'
  },
  { type: 'h3', text: 'Advanced structures' },
  {
    type: 'p',
    text: 'For stacks, queues, linked lists, binary trees, and heaps, the data_structures namespace provides a complete set of operations.'
  },
  {
    type: 'code',
    code: 'SET stack TO data_structures.create_stack()\ndata_structures.push(stack, 10)\ndata_structures.push(stack, 20)\nshow(data_structures.pop(stack)) # 20, last in first out'
  },
  {
    type: 'table',
    rows: [
    ['create_stack / push / pop / peek', 'Last-in, first-out'],
    ['create_queue / enqueue / dequeue / peek', 'First-in, first-out'],
    ['create_linked_list / append_node / prepend_node / to_list', 'Linked list'],
    ['create_binary_tree / insert_node / in_order', 'Binary tree'],
    ['create_heap / push_heap / pop_heap', 'Priority heap']]

  }]

},
{
  slug: 'oop',
  title: 'Object-Oriented Programming',
  description: 'Classes, inheritance, data classes, interfaces, and operator overloading.',
  blocks: [
  { type: 'h3', text: 'Defining a class' },
  {
    type: 'code',
    code: 'CLASS Circle\nFIELDS radius\nDEFINE area DO\nRETURN 3.14159 * radius OF THIS * radius OF THIS\nEND\nEND\n\nCREATE Circle WITH radius AS 5 INTO c\nCALL area ON c INTO result\nshow(result)',
    output: '78.53975'
  },
  {
    type: 'p',
    text: 'Inside a method, THIS refers to the current object, without needing to be declared as a parameter the way some languages require.'
  },
  { type: 'h3', text: 'Inheritance' },
  {
    type: 'code',
    code: 'CLASS Animal\nDEFINE speak DO\nshow("...")\nEND\nEND\n\nCLASS Dog INHERITS Animal\nDEFINE speak DO\nshow("Woof")\nEND\nEND\n\nCREATE Dog WITH INTO d\nCALL speak ON d INTO result',
    output: 'Woof'
  },
  {
    type: 'p',
    text: 'A class that defines no methods of its own still inherits everything from its parent, and this chain can run as deep as needed.'
  },
  { type: 'h3', text: 'Data classes' },
  {
    type: 'p',
    text: 'A DATA CLASS is a lightweight, unchangeable holder for a fixed set of values. Two data-class instances with the same field values are considered equal, and COPY produces a new instance with one or more fields changed.'
  },
  {
    type: 'code',
    code: 'DATA CLASS Point\nFIELDS x, y\nEND\n\nCREATE Point WITH x AS 1, y AS 2 INTO p1\nCOPY p1 WITH y AS 99 INTO p2\nshow(x OF p2)\nshow(y OF p2)',
    output: '1\n99'
  },
  { type: 'h3', text: 'Interfaces' },
  {
    type: 'p',
    text: 'An interface names a set of methods a class promises to provide, without saying how. A class that claims to implement an interface but is missing a required method is caught before the program ever runs, with a clear message naming exactly what is missing.'
  },
  {
    type: 'code',
    code: 'INTERFACE Shape\nDEFINE area\nDEFINE perimeter\nEND\n\nCLASS Square IMPLEMENTS Shape\nFIELDS side\nDEFINE area DO\nRETURN side OF THIS * side OF THIS\nEND\nDEFINE perimeter DO\nRETURN 4 * side OF THIS\nEND\nEND'
  },
  { type: 'h3', text: 'Private and static members' },
  {
    type: 'p',
    text: "A field or method marked PRIVATE can only be used from inside that class's own methods. A field or method marked STATIC belongs to the class itself rather than to any one instance, and is shared by every instance."
  },
  {
    type: 'code',
    code: 'CLASS Counter\nSTATIC FIELDS total AS 0\nDEFINE increment DO\nSET total OF Counter TO total OF Counter + 1\nEND\nEND\n\nCREATE Counter INTO c1\nCREATE Counter INTO c2\nCALL increment ON c1 INTO r1\nCALL increment ON c2 INTO r2\nshow(total OF Counter)',
    output: '2'
  },
  { type: 'h3', text: 'Custom iteration' },
  {
    type: 'p',
    text: 'A class can define an ITERATE method so its own instances can be used directly in a FOR EACH loop.'
  },
  { type: 'h3', text: 'Operator overloading' },
  {
    type: 'p',
    text: 'A class can define methods named ADD, SUBTRACT, EQUALS, and similar, so its instances respond naturally to +, -, ==, and the other operators.'
  },
  {
    type: 'code',
    code: 'CLASS Point\nFIELDS x, y\nDEFINE ADD WITH other DO\nSET new_x TO x OF THIS + x OF other\nSET new_y TO y OF THIS + y OF other\nCREATE Point WITH x AS new_x, y AS new_y INTO result\nRETURN result\nEND\nEND\n\nCREATE Point WITH x AS 1, y AS 2 INTO p1\nCREATE Point WITH x AS 3, y AS 4 INTO p2\nSET p3 TO p1 + p2\nshow(x OF p3)\nshow(y OF p3)',
    output: '4\n6'
  }]

},
{
  slug: 'error-handling',
  title: 'Error Handling',
  description: 'Try and catch, custom error types, and assertions.',
  blocks: [
  { type: 'h3', text: 'Try and catch' },
  {
    type: 'code',
    code: 'TRY\nSET result TO 10 / 0\nCATCH ERROR INTO e\nshow("Something went wrong: " + message OF e)\nEND',
    output: 'Something went wrong: Division by zero.'
  },
  {
    type: 'p',
    text: 'Every error caught this way has a message field describing what happened, in plain language rather than a raw technical description.'
  },
  { type: 'h3', text: 'Custom errors' },
  {
    type: 'p',
    text: 'A class that inherits from the built-in ERROR becomes its own error type, which can carry whatever extra information is useful and can be raised deliberately with RAISE.'
  },
  {
    type: 'code',
    code: 'CLASS InvalidScoreError INHERITS ERROR\nFIELDS message, reason_code\nEND\n\nDEFINE validate_score WITH score DO\nIF score < 0 DO\nRAISE InvalidScoreError WITH message AS "Score cannot be negative", reason_code AS 1\nEND\nRETURN score\nEND\n\nTRY\nCALL validate_score WITH -5 INTO ignored\nCATCH ERROR INTO e\nshow(message OF e)\nshow(reason_code OF e)\nEND'
  },
  { type: 'h3', text: 'Assertions' },
  {
    type: 'p',
    text: 'assert(condition, message) checks that something you believe to be true genuinely is, stopping the program with your message if it is not. It is a way of stating an assumption directly in the code, so a violation is caught immediately rather than causing confusing behavior somewhere else later.'
  },
  { type: 'code', code: 'SET balance TO 100\nassert(balance >= 0, "Balance should never go negative")' }]

},
{
  slug: 'pattern-matching',
  title: 'Pattern Matching',
  description: 'Matching a value against a series of fixed possibilities with WHEN and CASE.',
  blocks: [
  {
    type: 'p',
    text: 'WHEN compares one value against a series of CASE possibilities, running the block belonging to the first match. It is often clearer than a long chain of comparisons against the same value.'
  },
  {
    type: 'code',
    code: 'SET status TO "active"\nWHEN status DO\nCASE "pending" DO\nshow("Waiting to start")\nEND\nCASE "active" DO\nshow("Currently running")\nEND\nCASE "closed" DO\nshow("Finished")\nEND\nEND',
    output: 'Currently running'
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
    text: 'An enum defines a fixed, named set of possible values, useful anywhere a variable should only ever hold one of a small number of known states.'
  },
  {
    type: 'code',
    code: 'ENUM Status\nPending, Active, Closed\nEND\n\nSET current TO Status.Active\nIF current == Status.Active DO\nshow("It is active")\nEND'
  },
  { type: 'h3', text: 'Constants' },
  {
    type: 'p',
    text: 'As introduced in Language Basics, CONST creates a value that can never be reassigned, in either direction — a name already used as a constant cannot become an ordinary variable, and a name already used as an ordinary variable cannot become a constant.'
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
    text: 'INCLUDE brings in another file, under a chosen namespace, so its functions and values are reached with a dot, the same way a library is used.'
  },
  {
    type: 'code',
    code: '# helpers.eri\nDEFINE calculate_total WITH price, units DO\nRETURN price * units\nEND\n\n# main.eri\nINCLUDE "helpers.eri" AS helpers\nshow(helpers.calculate_total(9.99, 3))'
  },
  { type: 'h3', text: 'Controlling what is shared' },
  {
    type: 'p',
    text: 'By default, everything in an included file is reachable from outside it. Adding an EXPORT line to a file limits what is actually available through its namespace to only the names listed, keeping the rest as private, internal detail.'
  },
  { type: 'code', code: 'EXPORT calculate_total, format_report' },
  { type: 'h3', text: 'Packages' },
  {
    type: 'p',
    text: 'A larger, reusable piece of code can be published as its own installable package, with a manifest file describing its name, version, and any packages it depends on. Once published, anyone can install it and use it the same way they would use any built-in capability.'
  },
  { type: 'code', code: 'erilang search <package name>\nerilang install <package name>' }]

},
{
  slug: 'async',
  title: 'Asynchronous Programming',
  description: 'Marking functions ASYNC DEFINE and awaiting them.',
  blocks: [
  {
    type: 'p',
    text: 'A function marked ASYNC DEFINE can be awaited, allowing other asynchronous work to make progress while it runs — genuinely useful for things like handling many network connections at the same time, rather than one at a time in sequence.'
  },
  {
    type: 'code',
    code: 'ASYNC DEFINE fetch_value WITH n DO\nRETURN n * 2\nEND\n\nAWAIT CALL fetch_value WITH 5 INTO result\nshow(result)',
    output: '10'
  },
  { type: 'p', text: 'A class method can also be marked ASYNC DEFINE and awaited through the usual method-call form.' },
  {
    type: 'code',
    code: 'CLASS Fetcher\nASYNC DEFINE get_data WITH n DO\nRETURN n + 100\nEND\nEND\n\nCREATE Fetcher WITH INTO f\nAWAIT CALL get_data ON f WITH 5 INTO result'
  }]

},
{
  slug: 'files-data',
  title: 'Working with Files and Data',
  description: 'Reading and writing files, loading and filtering tabular data, CSV, databases, and JSON.',
  blocks: [
  { type: 'h3', text: 'Reading and writing text files' },
  {
    type: 'code',
    code: 'WRITE "Hello from Erilang" TO FILE "notes.txt"\nREAD FILE "notes.txt" INTO content\nshow(content)'
  },
  { type: 'h3', text: 'Loading tabular data' },
  { type: 'p', text: 'LOAD reads a data file into a dataset, ready for inspection and filtering.' },
  {
    type: 'code',
    code: 'LOAD "sales.csv" INTO sales\nDESCRIBE sales\nFILTER sales WHERE units > 50 INTO big_sales\nFOR EACH deal IN big_sales DO\nshow(deal)\nEND'
  },
  { type: 'h3', text: 'CSV files directly' },
  {
    type: 'code',
    code: 'SET rows TO LIST OF MAP WITH name AS "Ama", age AS 25\ncsv_write("people.csv", rows)\nSET loaded TO csv_read("people.csv")\nshow(loaded)'
  },
  {
    type: 'note',
    text: 'A value read back from a CSV file always comes back as text, since the format itself has no way of recording that a column was originally numeric. Convert it back with TO_NUMBER if you need to do arithmetic with it.'
  },
  { type: 'h3', text: 'Working with a database' },
  {
    type: 'code',
    code: 'SET db TO db_open("mydata.db")\ndb_execute(db, "CREATE TABLE users (id INTEGER, name TEXT)")\ndb_execute(db, "INSERT INTO users VALUES (?, ?)", LIST OF 1, "Ama")\nSET results TO db_query(db, "SELECT * FROM users")\nshow(results)\ndb_close(db)'
  },
  {
    type: 'note',
    text: 'Always pass values through the question-mark placeholders shown above, rather than building the query text by joining strings together — this keeps user-provided data safely separated from the query itself.'
  },
  { type: 'h3', text: 'JSON' },
  { type: 'code', code: 'SET data TO MAP WITH name AS "Ama", age AS 25\nSET text TO json.stringify(data)\nshow(text)' }]

},
{
  slug: 'standard-library',
  title: 'The Standard Library',
  description: 'The namespaces that ship with Erilang, from math to networking to image processing.',
  blocks: [
  {
    type: 'p',
    text: 'A wide range of capability comes ready to use, with no separate installation. Each area below is reached as a namespace — call any function inside it with a dot, the same way you would call a method on an object.'
  },
  { type: 'h3', text: 'math' },
  { type: 'p', text: 'Arithmetic and trigonometric functions: sqrt, power, abs, round, floor, ceiling, log, sin, cos, tan, pi, e, and more.' },
  { type: 'code', code: 'show(math.sqrt(144))\nshow(math.round(7.8))', output: '12.0\n8' },
  { type: 'h3', text: 'os' },
  { type: 'p', text: 'Files, directories, and the surrounding environment: get_env, path_exists, make_dir, list_dir, copy_file, move_file, delete_file, walk_directory, file_size, and more.' },
  { type: 'h3', text: 'time and datetime' },
  {
    type: 'p',
    text: 'time.now() gives the current moment as a raw number, well suited to measuring elapsed time. datetime works with calendar dates and human-readable formatting: now, today, format, format_now, add_days, difference_in_days, weekday, and more.'
  },
  { type: 'code', code: 'show(datetime.format_now())\nSET later TO datetime.add_days(datetime.now(), 7)' },
  { type: 'h3', text: 'regex' },
  { type: 'p', text: 'Pattern matching in text: regex.match, regex.extract, regex.replace.' },
  { type: 'h3', text: 'convert and casting' },
  { type: 'p', text: 'TO_NUMBER, TO_STRING, TO_BOOLEAN convert a value from one type to another, as covered in Data Types.' },
  { type: 'h3', text: 'bytes' },
  {
    type: 'p',
    text: 'Binary data handling: bytes.to_bytes, bytes.to_string, bytes.base64_encode, bytes.base64_decode, bytes.hex_encode, bytes.hex_decode, plus lower-level bitwise operations and mutable byte buffers for building binary data piece by piece.'
  },
  { type: 'code', code: 'SET data TO bytes.to_bytes("hello", "utf-8")\nSET encoded TO bytes.base64_encode(data)\nshow(encoded)' },
  { type: 'h3', text: 'hash' },
  {
    type: 'p',
    text: 'General-purpose hashing (hash, verify_hash, hmac_hash) is kept separate from password hashing, which needs a slower, more deliberate approach. hash_password and verify_password handle storing and checking passwords safely, generating a fresh random component automatically each time so identical passwords never produce identical stored values.'
  },
  { type: 'code', code: 'SET stored TO hash_password("a secret password")\nshow(verify_password("a secret password", stored))', output: 'TRUE' },
  { type: 'h3', text: 'Archives and compression' },
  { type: 'p', text: 'zip_create, zip_extract, tar_create, tar_extract, list_archive_contents.' },
  { type: 'h3', text: 'net and smtp' },
  { type: 'p', text: 'net.get and net.post make web requests. smtp.send sends email.' },
  { type: 'h3', text: 'socket' },
  {
    type: 'p',
    text: 'Raw network programming: create, bind, listen, accept, connect, send, receive, close, plus a fully asynchronous set (run_server, receive_async, send_async, close_async) for handling many connections at once.'
  },
  {
    type: 'code',
    code: 'SET server TO socket.create()\nsocket.bind(server, "127.0.0.1", 9423)\nsocket.listen(server, 5)\nSET client TO socket.accept(server)\nSET message TO socket.receive(client)\nsocket.send(client, "echo: " + message)'
  },
  { type: 'h3', text: 'html' },
  { type: 'p', text: 'Parsing web content: html.parse_html, find_element, find_all_elements, get_text, get_attribute.' },
  { type: 'h3', text: 'image, audio, video' },
  {
    type: 'p',
    text: 'image covers loading, saving, resizing, cropping, and filtering images. audio covers loading, trimming, combining, and exporting audio files. video covers loading, trimming, and extracting frames from video.'
  },
  { type: 'h3', text: 'gui' },
  { type: 'p', text: 'Windows, drawing, and interactive graphical programs — shapes, colors, and keyboard and mouse input.' },
  { type: 'h3', text: 'Randomness and identifiers' },
  {
    type: 'p',
    text: 'random_number, random_choice, shuffle, generate_uuid. set_random_seed(value) makes subsequent random results repeatable — useful whenever a result needs to be reproduced exactly later.'
  },
  { type: 'h3', text: 'Running other programs' },
  { type: 'p', text: 'run_command runs an external program and returns its output, exit status, and any error text.' },
  { type: 'h3', text: 'Command-line arguments' },
  { type: 'p', text: 'get_arg and has_arg read values passed in when a script is run from a terminal.' }]

},
{
  slug: 'repl',
  title: 'The Interactive Shell (REPL)',
  description: 'Typing statements one at a time and seeing results immediately.',
  blocks: [
  {
    type: 'p',
    text: 'Typing erilang with no file argument opens the interactive shell, where you type one statement at a time and see the result immediately. It is an excellent way to experiment, test an idea, or explore what a function does before committing it to a saved file.'
  },
  { type: 'h3', text: 'Everything you type is remembered' },
  {
    type: 'p',
    text: 'Variables, functions, and classes you define stay available for the rest of the session, so you can build up a piece of work gradually across several lines.'
  },
  { type: 'h3', text: 'Bare expressions' },
  {
    type: 'p',
    text: 'Typing an expression on its own line, without wrapping it in show(...), automatically prints its value and stores it in a special variable named _, letting you reuse the last result on the very next line.'
  },
  { type: 'code', code: '2 + 2\nshow(_ * 10)', output: '4\n40' },
  { type: 'h3', text: 'Multi-line blocks' },
  {
    type: 'p',
    text: 'A block that spans several lines — an IF, a DEFINE, a CLASS, and so on — is gathered automatically until its matching END is entered, shown by a continuation prompt while it is still open.'
  },
  { type: 'h3', text: 'Useful commands' },
  {
    type: 'table',
    rows: [
    [':show on / :show off', 'Reveal or hide the underlying generated code for each line you run'],
    [':help', 'Show the full list of available commands and shortcuts'],
    [':exit / :quit', 'Leave the shell']]

  }]

},
{
  slug: 'cli-tools',
  title: 'Command-Line Tools',
  description: 'The erilang command and its subcommands, the linter, and the formatter.',
  blocks: [
  {
    type: 'table',
    rows: [
    ['erilang run', 'Run a saved .eri script'],
    ['erilang', 'Open the interactive shell'],
    ['erilang lint', 'Check a file for likely mistakes, without running it'],
    ['erilang format', 'Rewrite a file into a consistent, standard style'],
    ['erilang doc', 'Generate reference documentation from doc comments'],
    ['erilang install', 'Install a published package'],
    ['erilang publish', 'Publish a package'],
    ['erilang search', 'Search for available packages']]

  },
  { type: 'h3', text: 'The linter' },
  {
    type: 'p',
    text: "The linter reads a file's structure without executing it, flagging things like a variable that is assigned but never used, code that can never be reached, or a class that claims to implement an interface while relying entirely on inherited methods."
  },
  { type: 'h3', text: 'The formatter' },
  {
    type: 'p',
    text: 'The formatter rewrites a file into one consistent style — standard indentation, consistent spacing, and a predictable blank line between top-level declarations — while carefully preserving every comment exactly where it was written.'
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
    text: 'Erilang deliberately offers two ways to call a function: as its own line with CALL ... WITH ... INTO, and inline with parentheses. Use the standalone form when a call is the entire point of a line, and the inline form when a result needs to feed directly into a larger expression. Neither is more correct than the other — pick whichever reads better in context.'
  },
  { type: 'h3', text: 'Prefer errors over silent failure' },
  {
    type: 'p',
    text: 'Use assert to state assumptions directly in your code, and real, named error types with RAISE for conditions a caller genuinely needs to recognize and handle. Letting a problem surface clearly, immediately, is almost always better than letting it pass silently and cause confusion somewhere else later.'
  },
  { type: 'h3', text: 'Keep manifests and passwords out of source code' },
  {
    type: 'p',
    text: 'Never hash a password with a general-purpose function such as hash — always use hash_password, which is specifically designed to resist the kind of brute-force checking a plain hash is vulnerable to.'
  },
  { type: 'h3', text: 'Document as you go' },
  {
    type: 'p',
    text: 'A double-hash comment directly above a function, class, or interface becomes real, structured documentation, automatically picked up by erilang doc. Writing it at the same time you write the code costs almost nothing and saves real effort later.'
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
    ['SET x TO value', 'Assign a variable'],
    ['CONST x TO value', 'Declare a constant'],
    ['IF ... DO ... ELSE ... END', 'Conditional'],
    ['WHILE ... DO ... END', 'Loop while a condition holds'],
    ['FOR x FROM a TO b [STEP n] DO ... END', 'Counting loop'],
    ['FOR EACH x IN collection DO ... END', 'Loop over a collection'],
    ['BREAK / CONTINUE', 'Exit or skip a loop iteration'],
    ['DEFINE name WITH params DO ... RETURN ... END', 'Function'],
    ['CALL name WITH args INTO result', 'Call a function as a statement'],
    ['name(args)', 'Call a function inline, as an expression'],
    ['TRY ... CATCH ERROR INTO e ... END', 'Handle errors'],
    ['RAISE ErrorType WITH fields', 'Raise a custom error'],
    ['CLASS Name [INHERITS Parent] [IMPLEMENTS I] ... END', 'Define a class'],
    ['CREATE Name WITH fields INTO var', 'Create an instance'],
    ['INTERFACE Name ... END', 'Define an interface'],
    ['ENUM Name ... END', 'Define an enum'],
    ['INCLUDE "file" AS namespace', 'Bring in another file'],
    ['EXPORT names', 'Limit what a file shares'],
    ['ASYNC DEFINE / AWAIT', 'Asynchronous function and call'],
    ['WHEN value DO ... CASE x DO ... END ... END', 'Pattern matching']]

  },
  { type: 'h3', text: 'Common types' },
  {
    type: 'table',
    rows: [
    ['NUMBER, STRING, BOOLEAN, NONE, BYTES', 'Core value types'],
    ['LIST OF ...', 'Ordered collection'],
    ['MAP WITH key AS value, ...', 'Key-value collection'],
    ['UNIQUE_LIST OF ...', 'Collection with no duplicates']]

  },
  {
    type: 'note',
    text: 'This guide covers the language as it stands today. Erilang continues to grow, with new capability added deliberately and carefully over time.'
  }]

}];
