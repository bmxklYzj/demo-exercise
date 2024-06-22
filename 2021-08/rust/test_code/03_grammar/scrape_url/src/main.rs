use std::fs;

fn main() {
    // test_request();
    test_unit();
    test_fun();
    test_struct();
    test_loop();
}

// 发送请求 rust 官网首页，并转换为 md
fn test_request() {
    for arg in std::env::args() {
        println!("{}", arg);
    }

    let args: Vec<String> = std::env::args().collect();
    let url = &args[1];
    let output = &args[2];

    println!("Fetching url: {}", url);
    let body = reqwest::blocking::get(url).unwrap().text().unwrap();

    println!("Converting html to markdown...");
    let md = html2md::parse_html(&body);

    fs::write(output, md.as_bytes()).unwrap();
    println!("Converted markdown has been saved in {}.", output);
}

// 函数如果没有显式 return，则返回值是最后一个表达式，如果最后不是表达式而是分号结尾的语句则返回值是 unit ()
fn test_unit() {
    fn pi() -> f64 {
        3.1415926
    }
    fn not_pi() {
        3.1415926;
    }
    let is_pi = pi();
    let is_unit1 = not_pi();
    let is_unit2 = {
        pi();
    };
    let is_pi2 = { pi() };
    print!(
        "is_pi: {:?}, is_unit1: {:?}, is_unit2: {:?}, is_pi2: {:?}\n",
        is_pi, is_unit1, is_unit2, is_pi2
    );
}

// 函数作为参数
fn test_fun() {
    fn apply(val: i32, f: fn(val: i32) -> i32) -> i32 {
        f(val)
    }
    fn square(val: i32) -> i32 {
        val * val
    }
    fn cube(val: i32) -> i32 {
        val * val * val
    }
    println!("square: {:?}, cube: {:?}", apply(2, square), apply(2, cube));
}

// 结构体
fn test_struct() {
    #[derive(Debug)]
    enum Gender {
        Male,
        Female,
        Unknown,
    }

    #[derive(Debug, Clone, Copy)]
    struct UserId(u64);

    #[derive(Debug, Clone, Copy)]
    struct TopicId(u64);

    #[derive(Debug)]
    struct User {
        id: UserId,
        name: String,
        gender: Gender,
    }

    #[derive(Debug)]
    struct Topic {
        id: TopicId,
        mame: String,
        owner: UserId,
    }

    #[derive(Debug)]
    enum Event {
        Join((UserId, TopicId)),
        Leave((UserId, TopicId)),
        Message((UserId, TopicId, String)),
    }

    let bob = User {
        id: UserId(1),
        name: "Bob".to_owned(),
        gender: Gender::Male,
    };
    let alice: User = User {
        id: UserId(2),
        name: "Alice".to_owned(),
        gender: Gender::Female,
    };
    let topic = Topic {
        id: TopicId(1),
        mame: "rust".to_owned(),
        owner: UserId(1),
    };
    let event1 = Event::Join((bob.id, topic.id));
    let event2 = Event::Leave((alice.id, topic.id));
    let event3 = Event::Message((alice.id, topic.id, "hello world".to_owned()));
    print!(
        "topic: {:?}, event1: {:?}, event2: {:?}, event3: {:?}\n",
        topic, event1, event2, event3
    );

    fn process_event(event: &Event) {
        match event {
            Event::Join((uid, tid)) => print!("user: {:?} joined tid: {:?}\n", uid, tid),
            Event::Leave((uid, tid)) => print!("user: {:?} leave tid: {:?}\n", uid, tid),
            Event::Message((_, _, msg)) => print!("broadcast: {:?}\n", msg),
        }
    }

    process_event(&event1);
    process_event(&event2);
    process_event(&event3);
}

// 循环
fn test_loop() {
    fib_loop(8);
    fib_while(8);
    fib_for(8);

    fn fib_loop(cnt: u8) {
        let mut a = 1;
        let mut b = 1;
        let mut i = 2u8;
        loop {
            let c = add(&mut a, &mut b);
            print!("val: {:?}\n", c);
            i += 1;
            if i >= cnt {
                break;
            }
        }
    }

    fn fib_while(cnt: u8) {
        let mut i = 2;
        let mut a = 1;
        let mut b = 1;
        while i < cnt {
            let c = add(&mut a, &mut b);
            print!("val: {}\n", c);
            i += 1;
        }
    }

    fn fib_for(cnt: u8) {
        let mut a = 1;
        let mut b = 1;
        for _i in 2..cnt {
            let c = add(&mut a, &mut b);
            print!("val: {}\n", c);
        }
    }

    fn add(a: &mut i32, b: &mut i32) -> i32 {
        let c = *a + *b;
        *a = *b;
        *b = c;
        c
    }
}
