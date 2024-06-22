use regex::Regex;

pub trait Parse {
    fn parse(s: &str) -> Self;
}

impl Parse for u8 {
    fn parse(s: &str) -> Self {
        let regex = Regex::new(r"^\d+").unwrap();
        if let Some(captures) = regex.captures(s) {
            return captures
                .get(0)
                .map_or(0, |v| v.as_str().parse().unwrap());
        }
        0
    }
}

#[test]
fn parse_should_work() {
    assert_eq!(u8::parse("123hello"), 123);
    assert_eq!(u8::parse("123"), 123);
    assert_eq!(u8::parse("hello123world"), 0);
}

fn main() {
    println!("result: {}", u8::parse("223hello"));
}
