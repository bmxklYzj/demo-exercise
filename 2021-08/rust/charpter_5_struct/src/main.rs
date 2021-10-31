fn main() {
  version_1();
  version_2();
  version_3();
}

// --------------------- 参数散乱:bad -----------------------------------
fn version_1() {
  let width = 4;
  let height = 3;

  println!("Area is: {}", area(width, height));
}

fn area(width: u32, height: u32) -> u32 {
  width * height
}

// --------------------- 元组：bad -----------------------------------
fn version_2() {
  let rectangle = (4, 3);
  println!("Area2 is: {}", area3(rectangle));

}

fn area3(rectangle: (u32, u32)) -> u32{
  rectangle.0 * rectangle.1
}

// ---------------------- 结构体：最佳方式 ----------------------------------
fn version_3() {
  let rectangle = Rectangle {
    width: 4,
    height: 3,
  };
  println!("Area3 is: {}", area2(&rectangle));
  println!("rectangle is: {}", rectangle);
}

struct Rectangle {
  width: u32,
  height: u32,
}
fn area2(rectangle: &Rectangle) -> u32 {
  rectangle.width * rectangle.height
}
