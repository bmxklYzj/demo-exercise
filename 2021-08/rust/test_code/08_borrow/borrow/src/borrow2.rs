fn main() {
    let mut v: Vec<&i32> = Vec::new();
    push_local_ref(&mut v);
    

    println!("v: {:?}", v);
}

fn push_local_ref(v: &mut Vec<&i32>){
    let a = 1;
    v.push(&a);
}
