fn main() {
    println!("Hello, world!");
    let vec = vec![1, 2, 3, 4];
    let vec1 = vec.clone();
    // print!("vec: {:?} vec1: {:?}", vec, vec1);

    print!("sum of vec1: {}", sum(vec1));
    print!("vec1: {:?}", vec1);
    print!("sum of vec: {}", sum(vec));
}
fn sum(data: Vec<u32>) -> u32 {
    data.iter().fold(0, |acc, v| acc + v)
}
