fn main() {
    let mut data = vec![1, 2, 3];
    // for ele in data.iter_mut() {
    //     data.push(*ele + 1);
    // }
    let data1 = vec![&data[0]];
    println!("daata[0]: {:p}", &data[0]);

    for i in  0..100 {
        data.push(i);
    }

    println!("data[0]: {:p}", &data[0]);
    println!("boxed: {:p}", &data1);
}