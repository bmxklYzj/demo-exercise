use std::io::stdin;
use rand::Rng;
use std::cmp::Ordering;
fn main() {
    println!("Hello, world!");

    let secret_number = rand::thread_rng().gen_range(1..=100);
    // println!("secret_number: {:?}", secret_number);

    loop {
        let mut guess = String::new();
        stdin().read_line(&mut guess).unwrap();
        println!("guess: {:?}", guess);
    
        let guess: i32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => {
                println!("Not a number");
                return;
            }
        };
        println!("guess: {:?}", guess);
    
        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small"),
            Ordering::Greater => println!("Too big"),
            Ordering::Equal => {
                println!("Correct!");
                break;
            },
        }
    }
}
