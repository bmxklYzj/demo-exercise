fn main() {
    println!("Hello, world!");

    let user1 = User {
        username: String::from("use-rname"),
        age: 24,
        email: "email".to_string(),
        active: true,
    };
    println!("user1: {:?}", user1);
    println!("user1.username: {}", user1.username);

    let build_user = build_user(String::from("user-name"), 25);
    println!("build_user: {:?}", build_user);

}

#[derive(Debug)]
struct User {
    username: String,
    age: u64,
    email: String,
    active: bool,
}

fn build_user(username: String, age: u64) -> User {
    User {
        username,
        age,
        email: "default-eamil".to_string(),
        active: true,
    }
}