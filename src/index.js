module.exports = function getZerosCount(number, base) {

  let primeFactors = [];
  let primeFactorBase = base;
  let primes = {};

  //get all prime factors:

  while (primeFactorBase % 2 == 0) {
    primeFactors.push(2)
    primeFactorBase = primeFactorBase / 2;
  }

  for (let i = 3; i <= Math.sqrt(primeFactorBase); i = i + 2) {
    while (primeFactorBase % i == 0) {
      primeFactors.push(i)
      primeFactorBase = primeFactorBase / i;
    }
  }

  if (primeFactorBase > 2) {
    primeFactors.push(primeFactorBase)
  }

  // count encounters of each unique prime factor:

  for (let i = 0; i < primeFactors.length; i++) {
    let prime = primeFactors[i];
    primes[prime] = primes[prime] ? primes[prime] + 1 : 1;
  }

  let uniquePrimes = Object.keys(primes);

  // count encounters of each prime in number, resulting trailing zero : 

  encForZeros = uniquePrimes.map(element => {
    let countEach = 0;
    for (let i = element;
      (number / i) >= 1; i *= element) {
      countEach += Math.floor(number / i);
    }

    return primes[element] > 1 ? Math.floor(countEach / primes[element]) : countEach
  });

  // find and return min of enc :

  return Math.min(...encForZeros);

};