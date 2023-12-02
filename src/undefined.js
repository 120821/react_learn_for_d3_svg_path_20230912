import React from 'react';

function ExampleComponent() {
  let variable1; // 未定义的变量
  let variable2 = 'undefined'; // 字符串值为 'undefined'

  console.log(variable1); // 输出 undefined
  console.log(typeof variable1); // 输出 "undefined"

  console.log(variable2); // 输出 "undefined"
  console.log(typeof variable2); // 输出 "string"

  return (
    <div>
      {variable1} {/* 输出 undefined */}
      {variable2} {/* 输出 "undefined" */}
    </div>
  );
}
