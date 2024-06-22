fn main() {
    let r = local_test();
    print!("r: {:p}", r);

    fn local_test<'a>() -> &'a i32{
        let a = 1;
        &a
    }
}