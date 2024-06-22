fn main() {
    println!("Hello, world!");
    let data = vec![1, 2, 3, 4];
    let data1 = &data;
    print!(
        "address of value: {:p}({:p}), address of data: {:p}, deta1: {:p}",
        &data, data1, &&data, &data1
    );

    print!("sum of data1: {}", sum(data1));
    print!("addr of items: [{:p}, {:p}, {:p}, {:p}]", &data[0], &data[1], &data[2], &data[3]);
}
fn sum(data: &Vec<u32>) -> u32 {
    print!("address of value: {:p} addr of ref: {:p}", data, &data);
    data.iter().fold(0, |acc, v| acc + v)
}
