fn is_copy<T: Copy>() {}
fn types_impl_copy_trait() {
    is_copy::<bool>();
    is_copy::<char>();

    is_copy::<i8>();
    is_copy::<u64>();
    is_copy::<i64>();
    is_copy::<usize>();

    is_copy::<fn()>();

    is_copy::<*const String>();
    is_copy::<*mut String>();

    is_copy::<&[Vec<u8>]>();
    is_copy::<&String>();

    is_copy::<[u8; 4]>();
    is_copy::<(&str, &str)>();
}

fn types_not_impl_copy_trait() {
    is_copy::<str>();
    is_copy::<[u8]>();
    is_copy::<Vec<u8>>();
    is_copy::<String>();

    is_copy::<&mut String>();
}
fn main() {
    types_impl_copy_trait();
    types_not_impl_copy_trait()
}