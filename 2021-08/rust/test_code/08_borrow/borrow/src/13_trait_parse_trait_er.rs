use std::str::FromStr;

use regex::Regex;

pub trait Parse {
    type Error;
    fn parse(s: &str) -> Result<Self, Self::Error>
    where
        Self: Sized;
}

impl<T> Parse for T
where
    T: FromStr + Default,
{
    type Error = String;

    fn parse(s: &str) -> Result<Self, Self::Error>
    where
        Self: Sized,
    {
        let r: Regex = Regex::new(r"^\d+(\.\d+)?").unwrap();
        match r.captures(s) {
            Some(captures) => captures
                .get(0)
                .map_or(Err("failed to capture".to_string()), |v| {
                    v.as_str()
                        .parse()
                        .map_err(|_| "failed to parse captured string".to_string())
                }),
            None => Err("failed to parse string".to_string()),
        }
    }
}

#[test]
fn parse_should_work() {
    assert_eq!(
        u8::parse("123.1hello"),
        Err("failed to parse captured string".to_string())
    );
    assert_eq!(u8::parse("123hello"), Ok(123));
    assert_eq!(u8::parse("123"), Ok(123));
    assert_eq!(
        u8::parse("hello123.1world"),
        Err("failed to parse string".to_string())
    );

    assert_eq!(f64::parse("123.1hello"), Ok(123.1));
    assert_eq!(f64::parse("123hello"), Ok(123.0));
    assert_eq!(f64::parse("123"), Ok(123.0));
    assert_eq!(
        f64::parse("hello123.1world"),
        Err("failed to parse captured string".to_string())
    );
}

fn main() {
    println!("result: {:?}", f64::parse("223hello"));
}
