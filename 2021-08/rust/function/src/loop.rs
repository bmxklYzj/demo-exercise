fn main() {
  // _fn_loop();
  // _fn_while();
  // _fn_for2();
  println!("{}", _fabnic(0));
  println!("{}", _fabnic(1));
  println!("{}", _fabnic(2));
  println!("{}", _fabnic(3));
  println!("{}", _fabnic(4));
  println!("{}", _fabnic(5));
  println!("{}", _fabnic(6));
  println!("{}", _fabnic(45));
}

// f(n) = f(n - 1) + f(n - 2);
fn _fabnic(n: i32) -> i32 {
  if n <= 1 {
    return n;
  }
  _fabnic(n - 1) + _fabnic(n - 2)
}

fn _fn_for2() {
  for element in (1..5).rev() {
    println!("element: {}", element);
  }
  println!("end");
}

fn _fn_for() {
  let arr = [0, 1, 2, 3, 4];
  for element in arr.iter() {
    println!("element: {}", element);
  }
  println!("end");
}

fn _fn_while() {
  let mut cnt = 5;
  while cnt != 0 {
    println!("cnt: {}", cnt);
    cnt -= 1;
  }
}

fn _fn_loop() {
  let mut cnt = 0;
  let result = loop {
    if cnt >= 5 {
      break cnt * 2;
    }
    cnt = cnt + 1;
    println!("loop: {}", cnt);
  };

  println!("result: {}", result); // 10
}