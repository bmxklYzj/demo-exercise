fn main() {
    let mut x = 42;
    println!("x p: {:?} &x: {:p}", x, &x);
    let y = &mut x;
    // 解引用，内部调用 DerefMut（其实现就是 *self）
    println!("y: {:p}", y);
    *y += 1;
    println!("y: {}", y);
}
