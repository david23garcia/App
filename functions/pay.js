
exports.pay = function (id) {
  const random = Math.random();
  const status = random < 0.9;
  return {id: id.substr(0, 5), status: status}
}

