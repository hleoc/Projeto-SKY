function dataAtualFormatada() {
  try {
    
    let data = new Date(),
      dia = data.getDate().toString(),
      diaF = dia.length == 1 ? "0" + dia : dia,
      mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
      mesF = mes.length == 1 ? "0" + mes : mes,
      anoF = data.getFullYear();
    return diaF + "/" + mesF + "/" + anoF;
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error });
  }
}

module.exports = {
  dataAtualFormatada,
};
