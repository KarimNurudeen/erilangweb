export interface CodeSample {
  id: string;
  label: string;
  note: string;
  code: string;
}

export const codeSamples: CodeSample[] = [
{
  id: 'simple',
  label: 'Simple',
  note: 'Full English keywords, no type declarations, no semicolons.',
  code: `SET name TO "stranger"
show("Hi, " + name + "!")

SET count TO 0
FOR i FROM 1 TO 10 DO
  SET count TO count + i
END

show("Total: " + TO_STRING(count))`
},
{
  id: 'classes',
  label: 'Classes',
  code: `DATA CLASS User
FIELDS id, name, email
END

DEFINE greet WITH user DO
  IF email OF user == NONE DO
    RETURN "Hi " + name OF user + ", add an email to get updates"
  END
  RETURN "Hi " + name OF user + ", we'll write to " + email OF user
END`,
  note: 'Lightweight data classes, plus real inheritance and interfaces.'
},
{
  id: 'async',
  label: 'Async',
  code: `ASYNC DEFINE fetch_price WITH item DO
  RETURN net.get("https://example.com/price/" + item)
END

AWAIT CALL fetch_price WITH "widget" INTO response
show(response)`,
  note: 'Mark a function ASYNC DEFINE and AWAIT it — useful for network calls.'
},
{
  id: 'modules',
  label: 'Modules',
  code: `# helpers.eri
DEFINE calculate_total WITH price, units DO
  RETURN price * units
END

EXPORT calculate_total

# main.eri
INCLUDE "helpers.eri" AS helpers
show(helpers.calculate_total(9.99, 3))`,
  note: 'Split code across files and bring it in with INCLUDE.'
},
{
  id: 'assertions',
  label: 'Assertions',
  code: `DEFINE total_with_tax WITH subtotal, tax_rate DO
  RETURN subtotal * (1 + tax_rate)
END

SET result TO total_with_tax(30.50, 0.08)
assert(result == 32.94, "Tax calculation looks wrong")
show(result)`,
  note: 'State assumptions directly in the code with assert.'
}];
