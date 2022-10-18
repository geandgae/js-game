(function () {
  "use strict";

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
  
})();
