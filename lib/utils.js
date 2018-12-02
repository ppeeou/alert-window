
const toPromise = f => (...options) =>
  new Promise((resolve, reject) => {
    f(...options, (error, data) => {
      if (error) return reject(error);
      return resolve(data);
    });
  });

const call = (a, b) => b(a);

function pipe(...fs) {
  return (acc) => {
    return fs.reduce(call, acc);
  }
}

function curry2(f) {
  return (..._) => {
    return _.length !== 2
      ? (..._2) => f(..._, ..._2)
      : f(..._);
  }
}