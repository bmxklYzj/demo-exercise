fn main() {
    let num = 5;
    if num < 5 {
        println!("number < 5");
    } else {
        println!("number >= 5");
    }

    // Error: expected `bool`, found integer
    if num != 0 {
        println!("number != 0");
    } else {
        println!("number == 0");
    }

    let condition = true;
    let num2 = if condition {
        5
    } else {
        6
    };
    println!("num2: {}", num2); // 5
}