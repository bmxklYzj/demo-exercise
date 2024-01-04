use std::{char, collections::HashMap, fs::File};

fn main() {
    // chapter 8: 集合
    calc_numbers();

    println!("pig_latin_strings: {}", pig_latin_strings("first"));
    println!("pig_latin_strings: {}", pig_latin_strings("apple"));

    add_user_to_commany();

    // chapter 9: 错误处理
    // panic_demo();

    file_open();
    
    // chapter 10: 泛型
    
}

fn file_open()  {
    let file = File::open("src/panic_demo.rs1");
    let file = match file {
        Ok(file) => file,
        Err(err) => panic!("Error opening file: {}", err),
    };
    // if let Err(e) = file {
    //     println!("error: {}", e);
    // } else {
    //     println!("file: {:?}", file);
    // }
}

fn panic_demo() {
    let vec = vec![1, 2, 3];
    vec[99];
}

fn add_user_to_commany() {
    let vec = vec![
        "Add Sally to Engineering",
        "Add Amir to Sales",
        "Add Earl to Sales",
    ];
    let mut hash_map = HashMap::new();
    for ele in vec {
        let mut split_whitespace = ele.split_whitespace();
        let person = split_whitespace.nth(1).unwrap();
        let dep = split_whitespace.nth(1).unwrap();
        let or_insert = hash_map.entry(dep).or_insert(Vec::new());
        or_insert.push(person);
    }
    for (key, value) in hash_map {
        print!("dep: {:?}, persons: {:?}\n", key, value);
    }
}

fn pig_latin_strings(str: &str) -> String {
    let yuanyin = String::from("aeiou");
    let mut pig_latin_strings = String::new();
    let mut chars = str.chars();
    let next: Option<char> = chars.next();
    if let Some(char) = next {
        if yuanyin.contains(char) {
            pig_latin_strings.push_str(str.chars().as_str());
            pig_latin_strings.push('-');
            pig_latin_strings.push_str("hay")
        } else {
            pig_latin_strings.push_str(chars.as_str());
            pig_latin_strings.push('-');
            pig_latin_strings.push(char);
            pig_latin_strings.push_str("ay");
        }
    }

    pig_latin_strings
}

fn calc_numbers() {
    let mut v = vec![1, 2, 3, 8, 7, 6, 5, 2];
    v.sort();
    let mid_index = v.len() / 2;
    println!(
        "mid_index: {}, mid val: {}",
        mid_index,
        v.get(mid_index).unwrap()
    );

    let mut map = HashMap::new();
    for ele in v {
        let count = map.entry(ele).or_insert(0);
        *count += 1;
    }
    let mut res = (0, 0);
    for (key, val) in map {
        if val > res.0 {
            res.0 = val;
            res.1 = key;
        }
    }
    println!("occur most frequent: {}", res.1);
}
