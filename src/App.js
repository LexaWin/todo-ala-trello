import React, {  } from 'react';
import './App.css';
import { AppRoutes } from './AppRoutes';

export const colors = ['red', 'yellow', 'blue', 'dark-blue', 'green', 'orange', 'light-green', 'violet',];
const prepareData = () => {
    let randomTasks = [];
    console.log(Object.values(colors));
    for (let i = 0; i < 10; i++) {
        randomTasks.push({
          text: `Task ${i + 1}`,
          id: `${i}`,
          comments: Math.random() > 0.5 ? [{              
            text: "Hello, this is a comment",
            author: "Test author",              
            }]
            : [],
            description: Math.random() > 0.5 ? "Awesome description" : undefined,
            tags: [...Object.values(colors).slice(0, (((Math.random() * 100) % 8) + 1))]
        });
    }
  return {
    todos: randomTasks.slice(0, 3),
      wips: randomTasks.slice(3, 6),
      done: randomTasks.slice(-4)
  };
};
const mock = prepareData();
function App() {
  return (
    <div className="App">
      <AppRoutes/>
    </div>
  );
}

export default App;
