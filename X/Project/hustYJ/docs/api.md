有借接口文档

[TOC]

### 商品类别

+ 其他[0]

* 电子设备[1]
* 书籍资料[2]
* 宿舍百货[3]
* 乐器[4]
* 门票卡劵[5]
* 美妆护肤[6]
* 女装[7]
* 男装[8]
* 鞋帽配饰[9]
* 代步工具[10]
* 户外运动[11]
* 其它[12]


### 状态码（重构版本弃用）

* 2200 - 成功
* 3302 - 未登录
* 3303 - 用户未认证 [index.go](..\src\model\index.go) 
* 4400 - 参数错误
* 5500 - 服务错误

### 地址

* 正式版地址:https://youjie.hustonline.net/2.0
* 测试地址:https://dev.youjie.hustonline.net/2.0
* 上传数据格式: json
* 返回数据格式: json

### 图片

* 所有的图片以绝对地址返回**http://image.youjie-mp.hustonline.net/xxxx.jpg**
* 市场(market)图片路径**mp/market/xxxx.jpg**，缩略图路径**mp/market/micro**
* 悬赏(reward)图片路径**mp/reward/xxxx.jpg**，缩略图路径**mp/reward/micro**
* 使用七牛云对象存储

### 说明

* **所有涉及次数的如果我没有返回该字段说明用户或者商品未产生任何行为或者我还没有汇总数据, 可以设置为０或者是１**

---

## 商品页

### 市场页(首页)

* url: https://youjie.hustonline.net/2.0/market.index

* method: POST

* auth token: not need

* request parameters:

  ```json
  {
      "type": 1, //  type: 租品-1,卖品-2
  	"category": [1,2,3] // 分类，详细见上，若空数组，则为全部分类
  	"areas": [],  // 地区
  	"label": "hot", // 按照热度值进行排序
  	"page": 0,      // 按照页面进行排序，这种排序方案是存在问题的之后 从0开始
  	"per_page": 3
  }
  ```

  **type: 租品-1,卖品-2**

  ****

  **category: 类别参照上面的表**

  **menu:顶部的菜单栏，对商品信息流进行“最热”(hot)和“推荐”(recommend)的区分**

  **areas: 寻求哪栋楼的**

  **label分别对应上面的搜索要求, 最新-1, 最近-2, 最热-3, 最贵-4 "new, near, hot, expensive"**

  **pages, 从0开始**

  **address, category为空的话则返回所有的数据**

* response:

  ```json
  {
      "data": [
          {
              "_id": "5c12392e556edf858e54356f",
              "type": 1,
              "rent_price": 10,
              "description": "这是一个小租品很好用",
              "pictures": [
                  "http://image.youjie-mp.hustonline.net/mp/market/balabala"
              ],
              "title": "租品标题",
              "pub_time": 1544698158,
              "address": "韵苑"
          },
          {
              "_id": "5c123a22556edf858e543571",
              "type": 2,
              "rent_price": 0,
              "sell_price": 100,
              "origin_price": 2000,
              "description": "这是一个卖品",
              "pictures": [
                  "http://image.youjie-mp.hustonline.net/mp/market/balabala"
              ],
              "title": "卖品标题",
              "pub_time": 1544698402,
              "address": "韵苑"
          }
      ],
      "error": "",
      "success": true
  }
  ```


* example:

  ```json
  
  ```


### 悬赏页面

* url: https://youjie.hustonline.net/2.0/reward.index

* method: POST

* Token: not need

* parameters:

  ```json
  {
      "areas": string[],
      "label": string,
    	"page": int,
      "per_page": int,
  }
  ```
  
  **type: 求租-1, 求购-2**

  **category: 类别参照上面的表**

  **address: 寻求哪栋楼的**

  **label分别对应上面的搜索要求, 最新 new, 最近 near, 最热 hot , 最贵 expensive**

  **page, 从1开始**

* response:

  ```json
  {
    "status": 200,
      
    "data": [{
      "_id": string,
      "type": string, // 出租的商品"1", 求租的商品"2"
      "title": string,
      "description": string,
      "price": int, //价格 单位CNY
      "address": string,
      "pub_time": string,　// 发布时间, 时间戳(int)
  }
  ```

- example:

  ```json
  {
      "status": 2200,
      "data": [
          {
              "pub_time": 1514099180,
              "description": "求租一台小电驴，哭哭我不想走路",
              "title": "求租一台小电驴",
              "pictures": [
                  "https://youjie.hustonline.net/photo/f1ce3fce-e878-11e7-8fb5-0242ac140004.png",
                  "https://youjie.hustonline.net/photo/f1f60752-e878-11e7-8fb5-0242ac140004.png",
                  "https://youjie.hustonline.net/photo/f21f9298-e878-11e7-a29a-0242ac140004.png"
              ],
              "price": 150,
              "address": "韵苑|16栋",
              "_id": "5a3f51ec623bda00198c381c",
              "type": "1"
          }
      ]
  }
  ```

### 市场发布页(包括租品和卖品)

* url: https://youjie.hustonline.net/2.0/market.publish

* method: POST

* parameters:

  ```json
  
  // 发布租品
  {
  	"type": 1, // 只能是 1 和 2 中的一个 否则报错
  	"title": "租品标题",
  	"description": "这是一个小租品很好用",
  	"pictures": ["http://image.youjie-mp.hustonline.net/balabala"],
  	"rent_price": 10,
  	"address": "韵苑",  // 也可以是 "韵苑|10栋" 这种格式
  	"category": 3,
  	"contact_way": "qq:1105388289"
  }
  
  
  // 发布卖品
  {
  	"type": 2,
  	"title": "卖品标题",
  	"description": "这是一个卖品",
  	"pictures": ["http://image.youjie-mp.hustonline.net/balabala"],
  	"rent_price": 10,
  	"sell_price": 100,
  	"origin_price": 2000,
  	"address": "韵苑",
  	"category": 3,
  	"contact_way": "qq:1105388289"
  }
  ```

  **type: 租品-1,卖品-2(按位操作)**

* response:

  ```json
  {
      "status": 200,
      "error": "",
    	"data": {
          "_id": "5c12392e556edf858e54356f" // Mongo给分配的index
      }
  }
  ```

### 悬赏发布(发布悬赏信息)

+ Url:https://youjie.hustonline.net/2.0/reward.publish

+ Method:POST

+ Paramenters:

  ```json
  {
      "type": byte,
      "title": string,
      "description": string,
      "except_price": float,
      "category": string,
      "contact_way": string // 微信 ID
  }
  ```
  
  **type: 租品-1,卖品-2(按位操作)**

+ response

  ```json
  {
      "status": 200,
    	"data": {
          "_id": "" // Mongo给分配的index
      }
  }
  ```

### 详情页

#### 市场品详情页

* url: https://youjie.hustonline.net/2.0/market.get

* method: POST

* parameters

  ```json
  {
      "_id": "5c12840e556edf14fc4649ad"
  }
  ```

* response:

  ```json
  {
      "data": {
          "_id": "5c12840e556edf14fc4649ad",
          "type": 2,
          "rent_price": 10,
          "description": "这是一个卖品",
          "pictures": [
              "http://image.youjie-mp.hustonline.net/balabala" // URL是正则匹配的，不符合规定的图片URL都会引发错误
          ],
          "title": "卖品标题",
          "create_at": 1544717326,
          "update_at": 1544717326,
          "address": "紫菘|",
          "num_of_view": "1", // 前端手动加1 让用户产生我的确影响了浏览量的错觉
          "num_of_collection": "0"
          "comment": [
                      {
                          "name": "",
                          "content": "",
                          "anonymous": false
                      }
  		],
  }.
      "error": "",
      "success": true
  }
  ```

  **is_like 0表示不喜欢, 1表示喜欢（弃用）**

  **is_collect 0表示不收藏, 1表示收藏(弃用)**

* example

  ```json
  
  ```


#### 悬赏品详情页

+ url: https://youjie.hustonline.net/2.0/reward.get

+ Method: POST

+ Token: need

+ Parameters

  ```json
  {
      "_id": "5c12840e556edf14fc4649ad"
  }
  ```

+ response

  ```json
  {
      "data": {
          "_id": "5c137a41556edf344de4feba",
          "pub_unionid": "oKxBz0x0n2O0HFytDeXYGmH7Kdeg",
          "title": "求一个大坤",
          "description": "求一个大鹏",
          "pictures": [],
          "category": 1,
          "except_price": 100,
          "address": "紫菘",
          "loc_point": {
              "type": "Point",
              "coordinates": [
                  -113,
                  -23.1
              ]
          },
          "comment": [
                      {
                          "name": "",
                          "content": "",
                          "anonymous": false
                      }
  		],
          "create_at": 1544780354
      },
      "error": "",
      "success": true
  }
  ```




#### 收藏

* url: https://youjie.hustonline.net/2.0/market.collect

* method: POST

* parameters:

  ```go
  {
      "_id": "someid"
  }
  ```
  
* response

  ```json
  {
      "status": 200,
    	"data": ""
  }
  ```

#### 取消收藏

- url: https://youjie.hustonline.net/2.0/market.collect

- method: DELETE

- parameters:

  ```go
  {
      "_id": "someid"
  }
  ```

- response

  ```json
  {
      "status": 200,
    	"data": ""
  }
  ```

#### 想要

* url:  https://youjie.hustonline.net/2.0/market.want

* method: POST

* parameters:

  ```go
  {
      "_id": "someid"
  }
  ```
  **type是商品的标识, 是出租商品还是求租商品(弃用)**

* response:

  ```json
  {
      "data": {
          "contact_way": "1105388289"
      },
      "error": "",
      "success": true
  }
  ```

#### 帮助

+ Url: https://youjie.hustonline.net/2.0/reward.help

+ Method: POST

+ parameters

  ```go
  {
      "_id": "someid"
  }
  ```

+ response:

  ```json
  {
      "data": {
          "contact_way": "tel:15387550833",
      },
      "error": "",
      "success": true
  }
  ```




#### 分享

- url: https://youjie.hustonline.net/2.0/user.share

- method: POST

- parameters:

  ```json
  {
      "_id": "",
      "type": 1 // 1-market 2-reward
  }
  ```

- response:

  ```json
  {
    	"data": null,
      "error": "",
      "success": true
  }
  ```
```
  
  **当用户点击分享按钮的时候, 上传此信息**



#### 获得评论

一般用不上，会整合到详细信息里

- url: https://youjie.hustonline.net/2.0/user.comment

- method: GET

- parameter

  ```json
  {
      "type": 1, // 1-market 2-reward
      "_id": "商品ID"
  }
```

- response

  ```json
  {
      "data": [
      {
          "name": "",
          "content": "",
          "anonymous": false
      }
  ],
      "error": "",
      "success": true
  }
  ```



#### 发布评论

- url: https://youjie.hustonline.net/2.0/user.comment

- method: POST

- parameter

  ```json
  {
      "type": 1, // 1-market 2-reward
      "_id": "商品ID",
      "name": "微信ID",
      "content": "content",
      "anonymous": false
  }
  ```

- response

  ```json
  {
      "data": null,
      "error": "",
      "success": true
  }
  ```

  

## 搜索页

### 获取热门搜索

* url: https://youjie.hustonline.net/2.0/search.hot

* method: GET

* response:

  ```json
  {
      "status": 200,
    	"data": [
          "自行车",
          "电脑",
  		"吹风机"
      ]
  }
  ```


### 内容搜索商品

* url: https://youjie.hustonline.net/2.0/search.content

* method: POST

* parameters:

  ```json
  {
      "content": "",
      "type": 1 //1 为市场，2 为悬赏
  }
  ```

* response:

  ```json
  {
     "status": 200,
     "data": [{
          "_id": string, //商品的id
      	"type": string, // 出租的商品-1, 求租的商品-2
      	"title": string,
      	"description": string,
      	"price": string, //价格
      	"category": string,
      	"is_deal": string, //是否可买或者可卖 1-不可买或者不可卖, 2-可买或者可卖
      	"origin_price": string,
      	"sell_price": string,
      	"contact_way": string,
      	"address": string,
      	"pub_time": int,　// 发布时间, 时间戳(int)
      	"num_of_view": int,
      	"num_of_collect": int,
      	"num_of_like": int,
      	"num_of_rent": int,
      	"pictures": []
  	}, {}]
  }
  ```

* example

  ```json
  {
      "status": 2200,
      "data": [
          {
              "category": "1",
              "status": 0,
              "is_deal": 2,
              "contact_way": "simoe97",
              "type": "1",
              "description": "华科最美丽的女子的二手口红，只卖女生哦",
              "order_time": "2017-12-19 19:32:52",
              "title": "张晓萌的口红",
              "pictures": [
                  "https://youjie.hustonline.net/photo/596921ca-e4b0-11e7-bf7d-0242ac140004.png",
                  "https://youjie.hustonline.net/photo/59693d72-e4b0-11e7-bf7d-0242ac140004.png"
              ],
              "price": 100,
              "num_of_view": 4,
              "sell_price": "100",
              "hot": 0,
              "pub_time": 1513683172354,
              "address": "韵苑23栋",
              "_id": "5a38f8e4623bda0019f418f6",
              "origin_price": "200"
          }
      ]
  }
  ```




## 用户页

### 个人主页

* url: https://youjie.hustonline.net/2.0/user.index

* method: GET

* response: 

  ```json
  {
    "status": 200,
    "data": {
        "_id": string,
        "nick_name": string,
        "avatar_url": string,
        "status": int,
        "address": string,
        "money": int,
        "num_of_pub": int,
        "num_of_view": int,
        "num_of_collect": int,
        "num_of_rent": int,
    }
  }
  ```
  

**返回的内容中可能没有num_of_collect等有关数据统计的字段, 因为应用不是实时的, 前端需要做好判断**

**status为1时未认证, 3时已经认证, 2正在验证中**

### 获取个人信息

* url: https://youjie.hustonline.net/2.0/user.info.get

* method: GET

* response:

  ```json
  {
      "status": 200,
      "data": {
          "college": string, 
      	"class": string,
      	"address": string,
      	"contact_way": string,
      	"status": int
      }
  }
  ```

  **status: 1是未认证, 2是已认证**. 有的字段没有出现请自行处理

### 编辑个人信息

* path: https://youjie.hustonline.net/2.0/user.info.update

* method: POST

* parameters:

  ```json
  // 更新微信信息
  {
  	"type": 2,
      "code": "code",
  	"encrypted_data": "Bw334aO+6CYZwIpns3R4h+EicykzVJhM4nQ16J6pXBh42MhiGn2B6waxGoXvmoJy8DJZo3PYdsaOM1+hUqatPhPfNIWEbgQ+JQeJ8P9u3DpqgTkfSUFnCm0vVx+34+de+kgy4zdi8uYkn3X74DWuEfsAbCg1f4sFi73UpFqBcPxU2/v9acEGBj+Qu8vJOkWXXsx39foHxBgzFGT9lMQi8zY9jmBqS4PZLz1oSVxUihNrigtF5TBR+KOrI0xY/LQy/5UuKI3a9Z2JaS8fx1FtbkNm+TQeBOeLHqn8H6Kw1BULuOpLWPwuItIPZ5u6kPIs3Pcxdz1mKlH54+k0tPab0TRfBcXvevRcOYprAQbVTjFA6Pi1VrdeGind8Wfeu+3AdrMWIMFzxsUdgkV+A9B62X2Subip6z/LUl27TIxn/J+tVOFSa9xN8fVcDPJQFItxra5/LbUdEShLpLVnTYZ46LfhsZTcrTW/QIkd0S5IMIqftjfuv4JTQNtXXvUDvl18gIHYzxNIB+xrIzya3yvHKzJ9UB5ycE65JjQrGgoy5pI=",
  	"iv": "BBTSqiJvAXJBjOznFYIbQA=="
  }
  
  // 更新个人信息
  {
  	"type": 3,
  	"address": "韵苑|12栋",
  	"college": "计算机科学学院",
  	"class": "本科16级",
  	"contact_way": "1105388289"
  }
  
  ```

* response:

  ```json
  // 更新微信信息返回
  {
      "data": {
          "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDQ2ODI4NjAsIm9wZW5pZCI6Im9sZTBxNUZodTBaRzF3YkxnTlE2czAza2plQ1UiLCJzZXNzaW9uX2tleSI6IkFNcndxR3JDbnY0bU11aWIrcG1qSVE9PSIsInVuaW9uaWQiOiJvS3hCejB4MG4yTzBIRnl0RGVYWUdtSDdLZGVnIn0.SKNLsfuiG0kEjMUz69ETqdONAjeZVGov1yJvvIuS12E"
      },
      "error": "",
      "success": true
  }
  // 更新个人信息返回
  {
      "data": {
          "jwt_token": ""
      },
      "error": "",
      "success": true
  }
  
  ```


### 个人登录

* url: https://youjie.hustonline.net/2.0/user.login

* method: POST

* Token:no need

* parameters:

  ```json
  {
  	"code": "023IXLtC0t681j2JphtC0oD1uC0IXLtH"
  }
  ```

* response

  ```json
  {
      "data": {
          "has_unionid": true,
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDQ5NTYzNTMsIm9wZW5pZCI6Im9sZTBxNUZodTBaRzF3YkxnTlE2czAza2plQ1UiLCJzZXNzaW9uX2tleSI6IkxWcDBvYlBjc2ovS0ZmeVFDNm5nYnc9PSIsInVuaW9uaWQiOiJvS3hCejB4MG4yTzBIRnl0RGVYWUdtSDdLZGVnIn0.hJKQeexc8vKHPqpentknvYzP8xVFw9en-Iw6Us7lWQw"
      },
      "error": "",
      "success": true
  }
  ```



### 我发布的Market

* url: https://youjie.hustonline.net/2.0/user.market.pub

* method: GET

* response: 

  ```json
  {
      "data": [
          {
              "_id": "5c128395556edf14fc4649ab",
              "type": 2,
              "rent_price": 10,
              "sell_price": 100,
              "origin_price": 2000,
              "description": "这是一个卖品",
              "pictures": [
                  "http://image.youjie-mp.hustonline.net/balabala"
              ],
              "title": "卖品标题",
              "pub_time": 1544717205,
              "address": "韵苑|11栋",
              "num_of_view": "0",
              "num_of_collection": "0",
              "is_deal": "false",
              "has_notify": true
          }
      ],
      "error": "",
      "success": true
  }
  ```

​       **返回的内容中可能没有num_of_collect等有关数据统计的字段, 因为应用不是实时的, 前端需要做好判断**

### 我发布的Reward

+ Url: https://youjie.hustonline.net/2.0/user.market.pub

+ Method: GET

+ Response:

```json
{
    "data": [
        {
            "_id": "5c137a41556edf344de4feba",
            "title": "求一个大坤",
            "description": "求一个大鹏",
            "pictures": [],
            "except_price": 100,
            "address": "紫菘|",
            "create_at": 1544780354,
            "num_of_view": "2",
            "num_of_collect": "0",
            "is_deal": "false",
        }
    ],
    "error": "",
    "success": true
}
```



### 我的收藏

* url: https://youjie.hustonline.net/2.0/user.collection

* method: GET

* request

  ```go
  type DoubleTypeParam struct {
  	Type int    `json:"type" validate:"required,oneof=1,2"`
  }
  ```

* response:

  ```json
  {
     "status": 200,
     "data": [{
       	"_id": string
      	"type": string, // 出租的商品1, 求租的商品2
      	"title": string,
      	"description": string,
      	"price": string, //价格
      	"category": string,
      	"is_deal": string, //是否可买或者可卖 1-不可买或者不可卖, 2-可买或者可卖
      	"origin_price": string,
      	"sell_price": string,
      	"contact_way": string,
      	"address": string,
      	"pub_time": int,　// 发布时间, 时间戳(int)
      	"num_of_view": int,
      	"num_of_collect": int,
      	"num_of_like": int,
      	"num_of_rent": int,
      	"pictures": []
  	}, {}]
  }
  ```



### 删除发布

#### 删除Market

* url: https://youjie.hustonline.net/2.0/user.item.delete

* method: POST

* parameter:

  ```json
  {
      "_id": "",
      "type": 1 // 1市场 2悬赏
  }
  ```

* response:

  ```json
  {
      "status": 200,
      "error": "",
      "data": ""
  }
  ```

#### 删除reward

+ url:https://youjie.hustonline.net/2.0/user.item.delete

+ Method: POST

+ Parameter:

  ```json
  {
      "_id": "",
      "type": 2 // 1市场 2悬赏
  }
  ```

+ Response:

  ```json
  {
      "status": 200,
      "error": "",
      "data": ""
  }
  ```

### 邀请码

* url: https://youjie.hustonline.net/2.0/user.invite

* method: POST

* parameter:

  ```json
  {
      "code": 530561257358
  }
  ```

* response:

  ```json
  {
      "status": 2200,
      "error": "",
      "data": "ok"
  }
  ```

### 校园卡认证

- url: https://youjie.hustonline.net/2.0/user.verify

- method: POST

- parameter:

  ```json
  {
      "name": "string", // 用户名
      "code": "string", // 学号
      "picture": "string", // 用户学生证正面照的七牛云地址
      "contact_way": "string" // 联系方式
  }
  ```




### 查询认证状态

- url: https://youjie.hustonline.net/2.0/user.verify

- method: GET

- response:

  ```json
  {
      "status": 2200,
      "error": "",
      "data": {
          [
              "_id": "id",
              "name": "姓名",
              "code": "学号",
              "picture": "校园卡照片地址",
              "contact_way": "联系方式",
              "time": 1234567890
          ]
      }
  }
  ```


### 是否有新留言

- url: https://youjie.hustonline.net/2.0/user.notify

- method: GET

- response

- ```json
  {
      "status": 2200,
      "error": "",
      "data": true,
  }
  ```

## 排行榜

### 微信

在用户进入小程序或者是分享小程序到群中是把群的GID传给后台

### 微信群信息上传

* url: https://youjie.hustonline.net/2.0/rank.upload

* method: POST

* parameters:

  ```go
  type ECIVParam struct {
  	EncryptedData string `json:"encrypted_data" query:"encrypted_data" validate:"required"`
  	Iv            string `json:"iv" query:"iv" validate:"required"`
  }
  ```

* response

  ```json
  {
   	"status": 200,
    	"data": ""
  }
  ```

#### 微信排行

* url: https://youjie.hustonline.net/2.0/rank.group

* method: GET

* response:

  ```json
  {
      "status": 200,
      "error": "",
    	"data": [{
          "gid": "", // groupOpenID
          "wealth_value": "" // group的财富值
      }]
  }
  ```


### 楼栋

* url: https://youjie.hustonline.net/2.0/rank.address

* method: GET

* response: 

  ```json
  {
      "status": 200,
      "data": [{
          "address": "",
          "wealth_value": ""
      }, {}]
  }
  ```

## 其它

### 图片接口

* url: https://youjie.hustonline.net/2.0/image.getToken

* method: POST

* parameters:

  ```json
  {
         "type": 1,  // 0是market图片上传接口 ， 1是reward图片上传接口
         "suffix": ".jpg",
   }
  ```

* response:

  ```json
  {
          "status": 200,
          "data": {
              "upload_token": "upload_token",
              "key": "key",
              "img": {
           	     "url": "url",
                }
            }
  }
  ```

**之后在图片地址末尾添加-thumbnail获得对应的缩略图**

### 微信图片安全检查

- url: https://youjie.hustonline.net/2.0/image.sec

- method: POST

- reqeust (multipart)

  media: 图片

- Resposne

  ```json
  true
  ```

  true代表通过

## 管理

### 管理员登录

- url:https://youjie.hustonline.net/2.0/admin.login

- method: POST

- parameter

  ```json
  {
      "username": "",
      "password": ""
  }
  ```

- response:

  ```json
  {
      "status": 200,
      "error": "",
      "data": "token"
  }
  ```

  

  ```json
  {
      "status": 401,
      "error": "Username or password wrong",
      "data": ""
  }
  ```

使用其它接口的时候附带query token={token}

### 获得学生认证列表

- url: https://youjie.hustonline.net/2.0/admin.verify.list

- method: GET

- parameter

  ```json
  {
      "status": 0 // 0-待审核 1-审核通过 2-审核不通过
  }
  ```



- response

  ```json
  {
      "status": 200,
      "error": "",
      "data": [
          {
              "_id": "id",
              "name": "姓名",
              "code": "学号",
              "picture": "校园卡照片地址",
              "contact_way": "联系方式",
              "time": 1234567890
          }
      ]
  }
  ```

  

###  通过认证

- url: https://youjie.hustonline.net/2.0/admin.verify.accept

- method: POST

- parameter:

  ```json
  {
      "_id": ""
  }
  ```

  

- response

  ```json
  {
      "status": 200,
      "error": "",
      "data": null
  }
  ```



### 拒绝通过认证

- url: https://youjie.hustonline.net/2.0/admin.verify.decline

- method: POST

- parameter

  ```json
  {
      "_id": ""
  }
  ```

- response

  ```json
  {
      "status": 200,
      "error": "",
      "data": null
  }
  ```




### 获得当天发布商品列表

- url:https://youjie.hustonline.net/2.0/admin.today

- method: GET

- response

  ```json
  {
      "status": 200,
      "error": "",
      "data": {
          "market": [{
              "title": "",
              "description": "",
              "price": 0.0
          }],
          "reward": [{
              "title": "",
              "description": "",
              "price": 0.0
          }]
      }
  }
  ```

  

