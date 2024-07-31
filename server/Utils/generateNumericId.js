exports.generateNumericId = (length) => {
    let numericId = '';
    const characters = '0123456789';
    for (let i = 0; i < length; i++) {
      numericId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return numericId;
  };
  