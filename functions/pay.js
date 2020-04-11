
exports.pay = function (id) {
  const random = Math.random();
  const status = random < 0.9;
  return {id: status ? id.substr(15, 5) : '', status: status}
}

