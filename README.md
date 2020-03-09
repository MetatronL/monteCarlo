# monteCarlo

Craps:

Joc: In Craps se arunca 2 zaruri dupa urmatoarele reguli:
  - Suma celor doua zaruri este 7 sau 11(natural) => castiga
  - Suma este 2, 3 sau 12 =? pierde
  - Se continua sa se arunce zarurile pana cand:
    - Suma coincide cu suma initiala => castiga
    - Suma este 7 => pierde 

Calculez sansa totala un milion de teste, plus sanse intermediare.
Sansa matematica este 0.492929

P(castig) = P(suma = 7 sau 11) + P(suma noua = suma veche)

P(castig) = [(6 / 36) + (2 / 36)] = (8 / 36) = 0.492929
