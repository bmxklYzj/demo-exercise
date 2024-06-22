use std::str::FromStr;

use regex::Regex;

pub trait Parse {
    fn parse(s: &str) -> Self;
}

impl<T> Parse for T
where
    T: FromStr + Default,
{
    fn parse(s: &str) -> Self {
        let r = Regex::new(r"^\d+(\.\d+)?").unwrap();
        let d = || Default::default();
        if let Some(captures) = r.captures(s) {
            return captures
                .get(0)
                .map_or(d(), |v| v.as_str().parse().unwrap_or(d()));
        }
        d()
    }
}

#[test]
fn parse_should_work() {
    assert_eq!(u8::parse("123.1hello"), 0);
    assert_eq!(u8::parse("123hello"), 123);
    assert_eq!(u8::parse("123"), 123);
    assert_eq!(u8::parse("hello123.1world"), 0);

    assert_eq!(f64::parse("123.1hello"), 123.1);
    assert_eq!(f64::parse("123hello"), 123.0);
    assert_eq!(f64::parse("123"), 123.0);
    assert_eq!(f64::parse("hello123.1world"), 0.0);
}

fn main() {
    println!("result: {}", f64::parse("223hello"));
}
