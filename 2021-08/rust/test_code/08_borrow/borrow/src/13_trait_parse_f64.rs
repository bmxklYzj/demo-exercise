use regex::Regex;

pub trait Parse {
    fn parse(s: &str) -> Self;
}

impl Parse for f64 {
    fn parse(s: &str) -> Self {
        let regex = Regex::new(r"^\d+(\.\d+)?").unwrap();
        if let Some(captures) = regex.captures(s) {
            return captures
                .get(0)
                .map_or(0.0, |v| v.as_str().parse().unwrap());
        }
        0.0
    }
}

#[test]
fn parse_should_work() {
    assert_eq!(f64::parse("123.1hello"), 123.1);
    assert_eq!(f64::parse("123hello"), 123.0);
    assert_eq!(f64::parse("123"), 123.0);
    assert_eq!(f64::parse("hello123.1world"), 0.0);
}

fn main() {
    println!("result: {}", f64::parse("223hello"));
}
