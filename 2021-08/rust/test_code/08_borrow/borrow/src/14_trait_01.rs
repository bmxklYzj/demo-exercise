#[derive(Debug, Clone)]
struct Developer {
    language: Language,
    name: String,
    age: u8,
}

#[derive(Debug, Clone)]
enum Language {
    JS,
    RUST,
    JAVA,
}


fn main() {
    let d = Developer {
        name: "yzj".to_owned(),
        age: 29,
        language: Language::RUST
    };
    let d1 = d.clone();
    println!("d: {:?}, name: {:?}", d, d.name);
    println!("d1: {:?}, name: {:?}", d1, d1.name);
}