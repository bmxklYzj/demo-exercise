#[derive(Debug, Clone, Default)]
struct Developer {
    language: Language,
    name: String,
    age: u8,
}

impl Developer {
    pub fn new(name: &str) -> Self {
        Self {
            name: name.to_owned(),
            ..Default::default()
        }
    }
}

#[allow(dead_code)]
#[derive(Debug, Clone)]
enum Language {
    JS,
    RUST,
    JAVA,
}

impl Default for Language {
    fn default() -> Self {
        Language::RUST
    }
}

fn main() {
    let d = Developer::default();
    let d2 = Developer::new("yzj");
    let d3: Developer = Default::default();
    println!("d: {:?}, d2: {:?}, d3: {:?}", d, d2, d3);
}
