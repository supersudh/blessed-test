var blessed = require('blessed');
const { prompt } = require('inquirer');

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true
});



screen.title = 'my window title';

// Create a box perfectly centered horizontally and vertically.
var box = blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'Hello {bold}world{/bold}!',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }
});

// Append our box to the screen.
screen.append(box);

// Add a png icon to the box
var icon = blessed.image({
  parent: box,
  top: 0,
  left: 0,
  type: 'overlay',
  width: 'shrink',
  height: 'shrink',
  file: __dirname + '/my-program-icon.png',
  search: false
});

// If our box is clicked, change the content.
box.on('click', function (data) {
  box.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
  screen.render();
});

// If box is focused, handle `enter`/`return` and give us some more content.
box.key('enter', function (ch, key) {
  box.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
  box.setLine(1, 'bar');
  box.insertLine(1, 'foo');
  screen.render();
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function (ch, key) {
  // console.log(key.name);
  screen.remove(box);
  screen.destroy();
  if (key.name === 'C-c') {
    process.exit(0);
  } else {
    // prompt([
    //   {
    //     type: 'list',
    //     name: 'choice',
    //     message: 'Select stuff',
    //     choices: [
    //       {
    //         name: 'name_1',
    //         value: 'Stay frosty'
    //       },
    //       {
    //         name: 'name_2',
    //         value: 'Stay Warm'
    //       }
    //     ]
    //   }
    // ]).then(() => {
      prompt([
        {
          type: 'text',
          'name': 'username',
          message: 'Enter username (random chars)',
        }
      ]).then(({ username }) => {
        console.log('username is ', username);
        console.log('quitting in 2 secs...');
  
        setTimeout(() => {
          process.exit();
        }, 2000);
      })
    // })
  }
});

// Focus our element.
box.focus();

// Render the screen.
screen.render();