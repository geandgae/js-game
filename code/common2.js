"use strict";
// import
// import * as name from './type.js';

// start
// (function () {
  
//   // 키보드 이벤트 - 임시
//   document.addEventListener("keydown", function (e) {
//     const keyCode = e.keyCode;
//     console.log("pushed key " + e.key);
//     if (keyCode == 65) {
//       // c key
//       // document.dispatchEvent(new KeyboardEvent('keydown', {key: 'e'}));
//       view_status();
//       // document.dispatchEvent(new KeyboardEvent('keyup', {key: 'e'}));
//     }
//     // if (keyCode == 65) {
//     //   hitbox(user , mob); // a
//     // }
//     // if (keyCode == 83) {
//     //   hitbox(mob , user); // s
//     // }
//     // if(keyCode == 13){ // Enter key
//     //   document.dispatchEvent(new KeyboardEvent('keydown', {key: 'e'}));
//     //   // document.dispatchEvent(new KeyboardEvent('keyup', {key: 'e'}));
//     // } else if(keyCode == 9){ // Tab key
//     //   document.dispatchEvent(new KeyboardEvent('keydown', {key: 't'}));
//     //   // document.dispatchEvent(new KeyboardEvent('keyup', {key: 't'}));
//     // }
//   });
// })();


// =========== 변수 ===========
// user 참조 객체(순수스탯)
let user_origin = {
  attack: 10,
};

// user 참조 객체(장비스탯)
let user_equipment = {
  attack: 0,
};

// user 객체
let user = {
  name: "user",

  hp: 100,
  max_hp: 100,

  hit: 50,
  block: 10,
  dodge: 10,
  counter: 50,
  attack: user_origin.attack + user_equipment.attack,
  defense: 10,
  resistance: 10,

  fumble: 1,
  normal: 2,
  critical: 4,

  late_c: 20, // 크리 확률
  late_f: 50, // 펌블 확률

  add_c: 0.0, // 크리 추가 데미지

  penetrate: 0, // 관통

  damage_x: 1,
  damage_y: 0, // 크리일때 저항 무시
};

// mob 객체
let mob = {
  name: "mob",

  hp: 200,
  max_hp: 200,

  hit: 50,
  block: 10,
  dodge: 10,
  counter: 50,
  attack: 10,
  defense: 10,
  resistance: 10,

  fumble: 1,
  normal: 2,
  critical: 3,

  late_c: 50, // 크리 확률
  late_f: 50, // 펌블 확률

  add_c: 0.0, // 크리 추가 데미지

  penetrate: 0, // 관통

  damage_x: 1,
  damage_y: 0, // 크리일때 저항 무시
};

// weapon 객체
let weapon_list = {
  a_01: {
    // hit : 100,
    attack: 15,
    name: "a_01",
  },
  a_02: {
    // hit : 100,
    attack: 40,
    name: "a_02",
  },
};

// 변수 설정
let p_damage = 50;
let r_damage = p_damage;
let b_damage;

let p_defense = 100;
let p_resistance = 0;

let late_c = 50;
let late_f = 50;

let add_c = 0.0; // 크리 추가 데미지

let damage_x = 1;
let damage_y = 0; // 크리일때 저항 무시

let stack = 0;

let p_buff = 0;

let v_buff = "debuff";

let btn = document.querySelector(".hit");

let log_view = document.querySelector(".log");

// view 설정
let view_uhp = document.querySelector(".view-wrap .user .hp");
view_uhp.innerText = `HP : ${user.hp} / ${user.max_hp}`;
let view_ust = document.querySelector(".view-wrap .user .st");
view_ust.innerText = `h ::: ${user.hit} b ::: ${user.block} d ::: ${user.dodge} c ::: ${user.counter} a ::: ${user.attack} d ::: ${user.defense} r ::: ${user.resistance}`;

let view_mhp = document.querySelector(".view-wrap .mob .hp");
view_mhp.innerText = `HP : ${mob.hp} / ${mob.max_hp}`;
let view_mst = document.querySelector(".view-wrap .mob .st");
view_mst.innerText = `h ::: ${mob.hit} b ::: ${mob.block} d ::: ${mob.dodge} c ::: ${mob.counter} a ::: ${mob.attack} d ::: ${mob.defense} r ::: ${mob.resistance}`;

let view_dmg = document.querySelector(".view-wrap .damage");
let view_miss = document.querySelector(".view-wrap .miss");
let view_counter = document.querySelector(".view-wrap .counter");

let trun_view = document.querySelector(".view-wrap");

let log_text;

let hit_type;
// =========== 변수 ===========


// weapon
function weapon(slot, type) {
  // console.log(slot);
  // console.log(type);

  // let user_h = slot.hit;
  let user_a = slot.attack;

  // let wp_h = type.hit;
  let wp_a = type.attack;

  // console.log(user_h);
  // console.log(user_a);
  // console.log(wp_h);
  // console.log(wp_a);

  // slot.hit = wp_h;

  console.log("user_a : " + user_a);
  console.log("wp_a : " + wp_a);

  // console.log(user_origin);
  // console.log(user_equipment);

  user_equipment.attack = wp_a;
  user.attack = user_origin.attack + user_equipment.attack;

  // log_box
  log_text = `user 은(는) ${type.name} 을(를) 장비하였다`;
  log_box();
  log_text = `공격력이 ${type.attack} 증가하였다`;
  log_box();
}

let console_test = function (e) {
  console.log("=================test1");
  console.log("origin : " + user_origin.attack);
  console.log("weapon : " + user_equipment.attack);
  console.log("total : " + user.attack);
  console.log(e);
}

function console_test2() {
  console.log("=================test2");
  user_origin.attack = user_origin.attack + 100;
  user.attack = user_origin.attack + user_equipment.attack;
  console.log("origin : " + user_origin.attack);
  console.log("weapon : " + user_equipment.attack);
  console.log("total : " + user.attack);
}

function console_test3() {
  console.log("=================test3");
  mob.attack = mob.attack + 100;
  console.log("total : " + mob.attack);
}

let stat_view = document.querySelector(".layer");
let stat_view_name = document.querySelector(".status .st-name");
let stat_view_hp = document.querySelector(".status .st-hp");
let stat_view_hit = document.querySelector(".status .st-hit");
let stat_view_attack = document.querySelector(".status .st-attack");
let stat_view_defense = document.querySelector(".status .st-defense");

// status
function view_status() {
  // console.log("user-hp : " + user.hp);
  // console.log("user-attack  : " + user.attack);
  // console.log("user-hit  : " + user.hit);
  // console.log("======================================");
  // console.log("mob-hp : " + mob.hp);
  // console.log("mob-attack  : " + mob.attack);
  // console.log("mob-hit  : " + mob.hit);


  // view_mhp.innerText = `HP : ${mob.hp} / ${mob.max_hp}`;

  stat_view_name.innerText = `${user.name}`;
  stat_view_hp.innerText = `hp : ${user.hp} / ${user.max_hp}`;
  stat_view_hit.innerText = `hit : ${user.hit}`;
  stat_view_attack.innerText = `attack : ${user.attack}`;
  stat_view_defense.innerText = `defense : ${user.defense}`;

  stat_view.classList.toggle("active");
}
// 키보드 이벤트 - 임시
const keyTab = (e) => {
  if (e.keyCode === 9) {
    if (e.shiftKey) {
      if (document.activeElement === tabFirst) {
        // e.preventDefault();
        tabLast.focus();
      }
    } else {
      if (document.activeElement === tabLast) {
        // e.preventDefault();
        tabFirst.focus();
      }
    }
  }
}

// move
let keys = [];
let keypress;
let ex_world = document.querySelector(".space");
let unit = document.querySelector(".player");
let speed = 1;
let speedX = 0;
let speedY = 0;
function player_move(d) {
  
  // console.log(keypress);
  // console.log(d);
  // if (d === "ArrowRight") {
  //   // console.log("right");
  //   if (speedX < 790) {
  //     speedX += speed;
  //     unit.style.left = `${speedX}px`;
  //   }
  // }
  // if (d === "ArrowLeft") {
  //   // console.log("left");
  //   if (speedX > 0) {
  //     speedX -= speed;
  //     unit.style.left = `${speedX}px`;
  //   }
  // }
  // if (d === "ArrowUp") {
  //   // console.log("up");
  //   if (speedY > 0) {
  //     speedY -= speed;
  //     unit.style.top = `${speedY}px`;
  //   }
  // }
  // if (d === "ArrowDown") {
  //   // console.log("down");
  //   if (speedY < 90) {
  //     speedY += speed;
  //     unit.style.top = `${speedY}px`;
  //   }
  // }
  // setInterval(() => {
  //   if (keys.ArrowRight === true || keys.ArrowLeft === true || keys.ArrowDown === true || keys.ArrowUp === true) {
  //     console.log("X : " + speedX);
  //     console.log("Y : " + speedY);
  //     if (keypress === "ArrowRight" || keypress === "d") {
  //       // console.log("right");
  //       if (speedX < 290) {
  //         speedX += speed;
  //       }
  //     }
  //     if (keypress === "ArrowLeft" || keypress === "a") {
  //       // console.log("left");
  //       if (speedX > 0) {
  //         speedX -= speed;
  //       }
  //     }
  //     if (keypress === "ArrowDown" || keypress === "s") {
  //       // console.log("down");
  //       if (speedY < 90) {
  //         speedY += speed;
  //       }
  //     }
  //     if (keypress === "ArrowUp" || keypress === "w") {
  //       // console.log("up");
  //       if (speedY > 0) {
  //         speedY -= speed;
  //       }
  //     }
  //     // if (keys.ArrowRight === true && keys.ArrowDown === true) {
  //     //   if (speedY < 90) {
  //     //     speedY += speed;
  //     //   }
  //     //   if (speedX < 290) {
  //     //     speedX += speed;
  //     //   }
  //     // }
  //     // if (keys.ArrowLeft === true && keys.ArrowDown === true) {
  //     //   if (speedY < 90) {
  //     //     speedY += speed;
  //     //   }
  //     //   if (speedX > 0) {
  //     //     speedX -= speed;
  //     //   }
  //     // }
  //     // if (keys.ArrowRight === true && keys.ArrowUp === true) {
  //     //   if (speedY > 0) {
  //     //     speedY -= speed;
  //     //   }
  //     //   if (speedX < 290) {
  //     //     speedX += speed;
  //     //   }
  //     // }
  //     // if (keys.ArrowLeft === true && keys.ArrowUp === true) {
  //     //   if (speedY > 0) {
  //     //     speedY -= speed;
  //     //   }
  //     //   if (speedX > 0) {
  //     //     speedX -= speed;
  //     //   }
  //     // }
      
  //     unit.style.top = `${speedY}px`;
  //     unit.style.left = `${speedX}px`;
  //   }
  // }, 1);

  setInterval(() => {
    if (keypress) {
      console.log("X : " + speedX);
      console.log("Y : " + speedY);
      if (keypress === "ArrowRight" || keypress === "d") {
        // console.log("right");
        if (speedX < 290) {
          speedX += speed;
        }
      }
      if (keypress === "ArrowLeft" || keypress === "a") {
        // console.log("left");
        if (speedX > 0) {
          speedX -= speed;
        }
      }
      if (keypress === "ArrowDown" || keypress === "s") {
        // console.log("down");
        if (speedY < 90) {
          speedY += speed;
        }
      }
      if (keypress === "ArrowUp" || keypress === "w") {
        // console.log("up");
        if (speedY > 0) {
          speedY -= speed;
        }
      }
      // if (keys.ArrowRight === true && keys.ArrowDown === true) {
      //   if (speedY < 90) {
      //     speedY += speed;
      //   }
      //   if (speedX < 290) {
      //     speedX += speed;
      //   }
      // }
      // if (keys.ArrowLeft === true && keys.ArrowDown === true) {
      //   if (speedY < 90) {
      //     speedY += speed;
      //   }
      //   if (speedX > 0) {
      //     speedX -= speed;
      //   }
      // }
      // if (keys.ArrowRight === true && keys.ArrowUp === true) {
      //   if (speedY > 0) {
      //     speedY -= speed;
      //   }
      //   if (speedX < 290) {
      //     speedX += speed;
      //   }
      // }
      // if (keys.ArrowLeft === true && keys.ArrowUp === true) {
      //   if (speedY > 0) {
      //     speedY -= speed;
      //   }
      //   if (speedX > 0) {
      //     speedX -= speed;
      //   }
      // }
      
      unit.style.top = `${speedY}px`;
      unit.style.left = `${speedX}px`;
    }
  }, 10);

}
// player_move();
setInterval(() => {
  if (keys.ArrowRight === true) {
    // console.log("right");
    if (speedX < 290) {
      speedX += speed;
    }
  }
  if (keys.ArrowLeft === true) {
    // console.log("left");
    if (speedX > 0) {
      speedX -= speed;
    }
  }
  if (keys.ArrowDown === true) {
    // console.log("down");
    if (speedY < 90) {
      speedY += speed;
    }
  }
  if (keys.ArrowUp === true) {
    // console.log("up");
    if (speedY > 0) {
      speedY -= speed;
    }
  }
  unit.style.top = `${speedY}px`;
  unit.style.left = `${speedX}px`;
}, 10);

document.addEventListener("keydown", function (e) {
  console.log("X : " + speedX);
  console.log("Y : " + speedY);
  keys[e.key] = true;
  console.log(keys);
  // console.log("pushed key " + e.key);
  if (e.key === "c") {
    console.log("pushed key " + e.key);
    view_status();
  }
});


document.addEventListener("keyup", function (e) {
  keypress = false;
  keys[e.key] = false;
});

// test
// window.addEventListener("keydown", keysPressed, false);
// window.addEventListener("keyup", keysReleased, false);
// function keysPressed(e) {
//   keypress = e.key;
//   // console.log("pushed key " + e.key);
//   if (e.key === "c") {
//     console.log("pushed key " + e.key);
//     view_status();
//   }
// 	// store an entry for every key pressed
// 	keys[e.key] = true;
//   console.log(keys);
	
// 	// // Ctrl + Shift + 5
// 	// if (keys[17] && keys[16] && keys[53]) {
// 	// 	// do something
// 	// }
	
// 	// // Ctrl + f
// 	// if (keys[17] && keys[70]) {
// 	// 	// do something
	
// 	// 	// prevent default browser behavior
// 	// 	e.preventDefault();	
// 	// }
// }
// function keysReleased(e) {
// 	// mark keys that were released
// 	keys[e.key] = false;
//   console.log(keys);
// }
// test



// log_box
function log_box() {
  let log_wrap = document.querySelector(".log-wrap");
  let log_wrap_h = log_wrap.scrollHeight;
  let log_line = document.createElement("p");
  let text = document.createTextNode(log_text);
  log_line.appendChild(text);
  log_view.appendChild(log_line);
  console.log(log_wrap_h)
  log_wrap.scrollTo({
    top: log_wrap_h,
    behavior: 'smooth'
  })
  // log_view.scrollTo({
  //   top: 0,
  //   left: 100,
  //   behavior: 'smooth'
  // });
  // console.log(log_text)
  // // 1. <div> element 만들기
  // const newDiv = document.createElement('div');
  // // 2. <div>에 들어갈 text node 만들기
  // const newText = document.createTextNode('안녕하세요');
  // // 3. <div>에 text node 붙이기
  // newDiv.appendChild(newText);
  // // 4. <body>에 1에서 만든 <div> element 붙이기
  // document.body.appendChild(newDiv);
}

// hit 판정
function hitbox(at, tg) {
  if (at && tg) {
    console.log("===== hitbox 판정 =====");
    // console.log(at);
    let e = at.hit;
    let dice = Math.floor(Math.random() * 100 + 1);
    if (e > dice) {
      console.log("hit : " + e);
      console.log("dice : " + dice);
      console.log("hit");
      block(at, tg);
    } else {
      console.log("hit : " + e);
      console.log("dice : " + dice);
      console.log("miss");
      test_type = "miss";
      counter(at, tg, test_type);

      // log_box
      // log_text = `${v_turn} 은(는) 공격은 miss`;
      // log_box();
    }
  } else {
    console.log("false");
  }
}

// block 판정
function block(at, tg) {
  console.log("===== block 판정 =====");
  let e = at.hit;
  let d = tg.block;
  let dice = Math.floor(Math.random() * e + 1);
  // 막기
  if (d > dice) {
    console.log("block : " + d);
    console.log("dice : " + dice);
    console.log("block");
    test_type = "block";
    counter(at, tg, test_type);

    view_miss.classList.add("active");
    view_miss.innerText = `block`;
    setTimeout(() => {
      view_miss.classList.remove("active");
    }, 500);

    // log_box
    // log_text = `${v_turn} 은(는) 공격은 block 당했다.`;
    // log_box();
  } else {
    console.log("block : " + d);
    console.log("dice : " + dice);
    console.log("block fail");
    dodge(at, tg);
  }
}

// dodge 판정
function dodge(at, tg) {
  console.log("===== dodge 판정 =====");
  let e = at.hit;
  let g = tg.dodge;
  let dice = Math.floor(Math.random() * e + 1);
  // console.log(p_dice);
  // 막기
  if (g > dice) {
    console.log("dodge : " + g);
    console.log("dice : " + dice);
    console.log("dodge");
    test_type = "dodge";
    counter(at, tg, test_type);

    view_miss.classList.add("active");
    view_miss.innerText = `dodge`;
    setTimeout(() => {
      view_miss.classList.remove("active");
    }, 500);

    // log_box
    // log_text = `${v_turn} 은(는) 공격은 dodge 당했다.`;
    // log_box();
  } else {
    console.log("dodge : " + g);
    console.log("dice : " + dice);
    console.log("damage");
    damage(at, tg);
  }
}

// counter 판정
function counter(at, tg, test_type) {
  console.log("===== counter 판정 =====");

  let ater = at.name;
  // let dter = tg.name;

  let e = tg.counter;
  let att = Math.round(tg.attack * 0.5);
  let hp = at.hp;
  let dice = Math.floor(Math.random() * 100 + 1);
  if (e > dice) {
    console.log("counter : " + e);
    console.log("dice : " + dice);
    console.log("counter!!!!");

    console.log(att);

    at.hp = hp - att;
    if (at.hp < 0) {
      at.hp = 0;
    }
    view_uhp.innerText = `HP : ${user.hp} / ${user.max_hp}`;
    view_mhp.innerText = `HP : ${mob.hp} / ${mob.max_hp}`;

    // view_dmg.classList.add("active");
    // view_dmg.innerText = `counter!! -${att}`;
    view_counter.classList.add("active");
    view_counter.innerText = `counter!! -${att}`;
    view_miss.classList.add("active");
    view_miss.innerText = `miss`;
    setTimeout(() => {
      view_counter.classList.remove("active");
      view_miss.classList.remove("active");
    }, 500);

    // log_box
    // log_text = `${v_turn} 은(는) 공격은 ${test_type}`;
    log_text = `${ater}의 공격은 ${test_type}`;
    log_box();
    log_text = `${ater}의 은(는) 반격당해 ${att} 피해를 입었다`;
    log_box();

    trun();
    // btn.classList.add("active");
    // console.log(btn);
  } else {
    console.log("counter : " + e);
    console.log("dice : " + dice);
    console.log("counter fail");

    view_miss.classList.add("active");
    view_miss.innerText = `miss`;
    setTimeout(() => {
      view_miss.classList.remove("active");
    }, 500);

    // log_text = `${v_turn} 은(는) 공격은 ${test_type}`;
    log_text = `${ater}의 공격은 ${test_type}`;
    log_box();

    trun();
    // btn.classList.add("active");
    // console.log(btn);
  }
}

// damage 판정
function damage(at, tg) {
  console.log("===== damage 판정 =====");
  let lc = at.late_c;
  let lf = at.late_f;
  let fmb = at.fumble;
  let cri = at.critical;
  let nor = at.normal;
  let ac = at.add_c;
  let dice = Math.floor(Math.random() * 100 + 1);
  console.log("dice1 : " + dice);
  if (lc > dice) {
    at.damage_x = cri + ac;
    at.damage_y = 10;
    console.log("critical : " + lc);
    console.log("damage_x : " + at.damage_x);
    console.log("critical");
    hit_type = "치명타";
    damage_a(at, tg);
  } else {
    let dice_2 = Math.floor(Math.random() * 100 + 1);
    console.log("dice2 : " + dice_2);
    if (lf > dice_2) {
      at.damage_x = fmb;
      at.damage_y = 0;
      console.log("fumble : " + lf);
      console.log("damage_x : " + at.damage_x);
      console.log("fumble");
      hit_type = "빗맞힘";
      damage_a(at, tg);
    } else {
      at.damage_x = nor;
      at.damage_y = 0;
      console.log("damage_x : " + at.damage_x);
      console.log("normal");
      hit_type = "일반공격";
      damage_a(at, tg);
    }
  }
}

// damage 계산
function damage_a(at, tg) {
  // if (v_buff == "buff") {
  //   p_damage = b_damage;
  // } else {
  //   p_damage = r_damage;
  // }
  console.log("===== damage =====");
  // Math.floor(Math.random() * (max - min)) + min;
  // let damage = (p_damage - p_defense) * (100 - p_resistance ) / 100;
  // let damage = Math.round((p_damage - p_defense) * (100 - p_resistance ) / 100 + 0);

  // // let damage4 = (p_damage * (100 - p_resistance) / 100) - p_defense;
  // // let damage5 = p_damage * damage2;
  // // let damage0 = damage1 - damage5;
  // console.log(damage4);
  // console.log(damage5);
  // console.log(damage0);

  let ater = at.name;
  let dter = tg.name;

  let hp = tg.hp;
  let att = at.attack;
  let x = at.damage_x;
  let y = at.damage_y;
  let pnt = at.penetrate;

  let def = tg.defense;
  let res = tg.resistance;

  let damage1 = att * x - (def - pnt * 0.5);
  let damage2 = (100 - (res - y)) / 100;
  let damage3 = Math.round(damage1 * damage2);
  if (damage3 <= 0) {
    damage3 = 1;
  }
  console.log("damage_ori : " + damage1);
  console.log("damage_res : " + damage2);
  console.log("damage : " + damage3);

  tg.hp = hp - damage3;

  if (tg.hp < 0) {
    tg.hp = 0;
  }
  view_uhp.innerText = `HP : ${user.hp} / ${user.max_hp}`;
  view_mhp.innerText = `HP : ${mob.hp} / ${mob.max_hp}`;

  view_dmg.classList.add("active");
  view_dmg.innerText = `${hit_type}!! ${damage3}`;
  setTimeout(() => {
    view_dmg.classList.remove("active");
  }, 500);

  // log_box
  // log_text = `${v_turn} 은(는) ${hit_type}!! ${damage3} 피해를 주었다`;
  log_text = `${ater}은(는) ${dter}에게 ${hit_type}!! ${damage3} 피해를 주었다`;
  log_box();

  trun();

  // console.log(btn);
}

// trun stack
function trun(e) {
  // stack++;
  // p_buff--;
  // if (p_buff < 0) {
  //   v_buff = "debuff";
  // }
  // console.log("stack : " + stack);
  // console.log("time : " + p_buff);
  // console.log("v_buff : " + v_buff);
  if (user.hp <= 0) {
    // console.log("========= game over =========");
    log_text = `user 은(는) 패배하였다`;
    log_box();
  } else if (mob.hp <= 0) {
    // console.log("========= game clear =========");
    log_text = `user 은(는) 승리하였다`;
    log_box();
  } else {
    setTimeout(() => {
      btn.classList.add("active");
    }, 500);
  }
}

// buff 지금은 사용 안 함
function buff(e) {
  p_buff = 3;
  v_buff = "buff";
  b_damage = r_damage + 1000;
  console.log("stack : " + stack);
  console.log("time : " + p_buff);
  console.log("v_buff : " + v_buff);
  console.log(b_damage);
}

// start 공격 이벤트 버튼
let v_turn = "user";

function start() {
  if (v_turn == "user") {
    console.log(v_turn);
    // 데미지 계산 
    btn.classList.remove("active");
    hitbox(user, mob);
    
    // 턴 넘기기
    setTimeout(() => {
      trun_view.classList.remove("turn_user");
      trun_view.classList.add("turn_mob");
      btn.innerText = `mob hit`;
      v_turn = "mob";
    }, 500);
    
  } else {
    console.log(v_turn);
    // 데미지 계산
    btn.classList.remove("active");
    hitbox(mob, user);

    // 턴 넘기기
    setTimeout(() => {
      trun_view.classList.remove("turn_mob");
      trun_view.classList.add("turn_user");
      btn.innerText = `user hit`;
      v_turn = "user";
    }, 500);
  }
}


// 키보드 이벤트 임시
// var event = document.createEvent("Events");
// event.initEvent('keydown', true, true);
// event.keyCode = 13;
// document.getElementById('objId').dispatchEvent(event);

// element.addEventListener("keydown", function(e){ console.log(e.key, e.char, e.keyCode) })

// var e = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "Q", char : "Q", shiftKey : true});
// element.dispatchEvent(e);

// //If you need legacy property "keyCode"
// // Note: In some browsers you can't overwrite "keyCode" property. (At least in Safari)
// delete e.keyCode;
// Object.defineProperty(e, "keyCode", {"value" : 666})

// var e = new KeyboardEvent("keydown", {
// 	bubbles : true,
// 	cancelable : true,
// 	char : "Q",
// 	key : "q",
// 	shiftKey : true,
// 	keyCode : 81
// });

// IIFE(Immediately-invoked function expression: 즉시 작동하는 함수식)
// (function() {
// 	// 코드
// })();
// 키보드 이벤트 임시
