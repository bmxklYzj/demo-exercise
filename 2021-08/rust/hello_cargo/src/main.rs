use reqwest::Client;
use tokio::time::{sleep, Duration};
use futures_util::StreamExt;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // 创建一个 HTTP 客户端
    let client = Client::new();

    // 发起 GET 请求到 SSE 端点
    let mut res = client.get("http://127.0.0.1:8088/sse").send().await?;

    // 检查响应状态码
    if !res.status().is_success() {
        println!("Request failed with status code: {}", res.status());
        return Ok(());
    }

    // 获取响应的流数据
    let mut body = res.bytes_stream();

    // 处理响应的事件流
    while let Some(item) = body.next().await {
        match item {
            Ok(chunk) => {
                // 将字节转换为字符串
                let data = String::from_utf8_lossy(&chunk);
                println!("Received data: {}", data);

                // 模拟处理事件的耗时操作
                // 这里可以根据实际需求处理事件数据
                // 注意：在真实场景中，可能需要将处理逻辑移到一个单独的异步任务中进行处理
                sleep(Duration::from_secs(1)).await;
            }
            Err(e) => {
                eprintln!("Error receiving data: {}", e);
                break;
            }
        }
    }

    Ok(())
}
