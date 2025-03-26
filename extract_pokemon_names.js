const fs = require('fs');

// 读取JSON文件
const pokemonData = require("D:\\project\\宝可梦\\pokemon-dataset-zh-main\\data\\pokemon_list.json");

// 创建一个映射对象
let nameMapping = {};

// 遍历JSON数据，提取映射关系
pokemonData.forEach(pokemon => {
  // 将英文名称映射到中文名称
  // 注意：将英文名称转为小写，以便与API返回的名称匹配
  nameMapping[pokemon.name_en.toLowerCase()] = pokemon.name;
});

// 将映射对象转为所需的字符串格式
let mappingString = "";
Object.keys(nameMapping).forEach(englishName => {
  mappingString += `"${englishName}": "${nameMapping[englishName]}", `;
});

// 输出到控制台
console.log(mappingString);

// 将结果写入文件
fs.writeFileSync('pokemon_name_mapping.js', `const pokemonNameMap = {\n  ${mappingString.replace(/(.{100}[^,]*,) /g, '$1\n  ')}\n};\n\nmodule.exports = pokemonNameMap;`);

console.log("映射已保存到 pokemon_name_mapping.js 文件中");