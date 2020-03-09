# Craps:

Joc: In Craps se arunca 2 zaruri dupa urmatoarele reguli:
  - Suma celor doua zaruri este 7 sau 11(natural) => castiga
  - Suma este 2, 3 sau 12 =? pierde
  - Se continua sa se arunce zarurile pana cand:
    - Suma coincide cu suma initiala => castiga
    - Suma este 7 => pierde 

Sansa este nr_castiguri / nr_teste;

Calculez sansa totala un milion de teste, plus sanse intermediare.
Sansa matematica este 0.492929

P(castig) = P(suma = 7 sau 11) + P(suma noua = suma veche)


# Penney’s Game:

Joc: Avem o moneda pe care o putem arunca. Putem obtine cap(H = head) sau pajura(T = tail)

Doi sau mai multi jucatori isi aleg o serie de stari diferite de exemplu (T T T sau H T T, etc.).
Primul care isi regaseste starea aleasa in sirul de aruncari castiga.
De exemplu pt TTT vs HTT
Pentru seria de aruncari HTTT castiga HTT deoarece aceasta combinatie apare inaintea combinatiei TTT.

Sansa este nr_castiguri / nr_teste;

Un exemplu de output este:

X	TTT	TTH	THT	THH	HTT	HTH	HHT	HHH
TTT	0	0.500	0.598	0.599	0.874	0.582	0.703	0.500
TTH	0.500	0	0.334	0.335	0.749	0.372	0.500	0.299
THT	0.666	0.666	0	0.500	0.503	0.499	0.625	0.419
THH	0.500	0.500	0.500	0	0.500	0.499	0.249	0.126
HTT	0.500	0.500	0.500	0.500	0	0.502	0.666	0.400
HTH	0.498	0.498	0.498	0.498	0.498	0	0.667	0.402
HHT	0.333	0.333	0.333	0.333	0.333	0.333	0	0.501
HHH	0.499	0.499	0.499	0.499	0.499	0.499	0.499	0
