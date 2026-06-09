CREATE DATABASE Appfood
USE Appfood

CREATE TABLE `user` (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE restaurant (
    res_id INT AUTO_INCREMENT PRIMARY KEY,
    res_name VARCHAR(255),
    Image VARCHAR(255),
    `desc` VARCHAR(255)
);

CREATE TABLE food_type (
    type_id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(255)
);

CREATE TABLE food (
    food_id INT AUTO_INCREMENT PRIMARY KEY,
    food_name VARCHAR(255),
    image VARCHAR(255),
    price FLOAT,
    `desc` VARCHAR(255),
    type_id INT
);

CREATE TABLE sub_food (
    sub_id INT AUTO_INCREMENT PRIMARY KEY,
    sub_name VARCHAR(255),
    sub_price FLOAT,
    food_id INT
);

CREATE TABLE rate_res (
    user_id INT,
    res_id INT,
    amount INT,
    date_rate DATETIME
);

CREATE TABLE like_res (
    user_id INT,
    res_id INT,
    date_like DATETIME
);

CREATE TABLE `order` (
    user_id INT,
    food_id INT,
    amount INT,
    code VARCHAR(255),
    arr_sub_id VARCHAR(255)
);


ALTER TABLE food ADD FOREIGN KEY (type_id) REFERENCES food_type(type_id)


ALTER TABLE sub_food ADD FOREIGN KEY (food_id) REFERENCES food(food_id)


ALTER TABLE rate_res ADD FOREIGN KEY (user_id) REFERENCES `user`(user_id)
ALTER TABLE rate_res ADD FOREIGN KEY (res_id) REFERENCES restaurant(res_id)


ALTER TABLE like_res ADD FOREIGN KEY (user_id) REFERENCES `user`(user_id)
ALTER TABLE like_res ADD FOREIGN KEY (res_id) REFERENCES restaurant(res_id)


ALTER TABLE `order` ADD FOREIGN KEY (user_id) REFERENCES `user`(user_id)
ALTER TABLE `order` ADD FOREIGN KEY (food_id) REFERENCES food(food_id)


INSERT INTO `user` (full_name, email, password) VALUES
('Nguyen Van A', 'nguyenvana@gmail.com', '123456'),
('Tran Thi B', 'tranthib@gmail.com', '123456'),
('Le Van C', 'levanc@gmail.com', '123456'),
('Pham Thi D', 'phamthid@gmail.com', '123456'),
('Hoang Van E', 'hoangvane@gmail.com', '123456');

INSERT INTO restaurant (res_name, Image, `desc`) VALUES
('Phở Bát Đàn', 'pho_bat_dan.jpg', 'Phở bò gia truyền Hà Nội'),
('Cơm Tấm Ba Ghiền', 'com_tam.jpg', 'Cơm tấm sườn khổng lồ siêu ngon'),
('Bún Bò Huế O Xuân', 'bun_bo.jpg', 'Đậm đà hương vị ruốc Huế'),
('KFC', 'kfc.jpg', 'Gà rán giòn tan, chuẩn vị Mỹ'),
('Pizza Hut', 'pizza.jpg', 'Pizza đế dày viền phô mai');

INSERT INTO food_type (type_name) VALUES
('Món Nước'),
('Cơm'),
('Đồ Ăn Nhanh'),
('Đồ Uống'),
('Tráng Miệng');

INSERT INTO food (food_name, image, price, `desc`, type_id) VALUES
('Phở Bò Tái Nạm', 'pho_bo.jpg', 55000, 'Nước dùng thanh ngọt, thịt bò mềm', 1),
('Cơm Tấm Sườn Bì Chả', 'suon_bi_cha.jpg', 65000, 'Sườn nướng than hoa thơm lừng', 2),
('Gà Rán Truyền Thống', 'ga_ran.jpg', 35000, '1 miếng gà rán giòn rụm', 3),
('Trà Đào Cam Sả', 'tra_dao.jpg', 25000, 'Thức uống giải nhiệt mùa hè', 4),
('Bánh Flan', 'banh_flan.jpg', 15000, 'Béo ngậy, đắng nhẹ vị caramel', 5);

INSERT INTO sub_food (sub_name, sub_price, food_id) VALUES
('Thêm bánh phở', 10000, 1),
('Thêm quẩy', 5000, 1),
('Thêm sườn nướng', 30000, 2),
('Thêm trứng ốp la', 10000, 2),
('Sốt phô mai', 15000, 3);

INSERT INTO rate_res (user_id, res_id, amount, date_rate) VALUES
(1, 1, 5, '2023-10-01 08:30:00'),
(2, 2, 4, '2023-10-02 12:15:00'),
(3, 3, 5, '2023-10-03 19:00:00'),
(4, 4, 3, '2023-10-04 20:30:00'),
(5, 5, 4, '2023-10-05 11:45:00');

INSERT INTO like_res (user_id, res_id, date_like) VALUES
(1, 1, '2023-10-01 08:35:00'),
(2, 2, '2023-10-02 12:20:00'),
(3, 1, '2023-10-03 19:10:00'),
(4, 3, '2023-10-04 20:40:00'),
(5, 4, '2023-10-05 11:50:00');

INSERT INTO `order` (user_id, food_id, amount, code, arr_sub_id) VALUES
(1, 1, 2, 'ORD0001', '1,2'),
(2, 2, 1, 'ORD0002', '4'),
(3, 3, 3, 'ORD0003', '5'),
(4, 4, 2, 'ORD0004', ''),
(5, 5, 4, 'ORD0005', '');

--Tìm ra 5 người đã like nhà hàng nhiều nhất
SELECT `user`.user_id, `user`.full_name, `user`.email, COUNT(like_res.user_id) AS `[Số lần like]`
FROM like_res
INNER JOIN `user` ON like_res.user_id = `user`.user_id
GROUP BY user_id, full_name, email
ORDER BY `[Số lần like]` DESC
LIMIT 5

--Tìm ra 2 nhà hàng có lượt like nhiều nhất

SELECT restaurant.res_id, restaurant.res_name, restaurant.Image, restaurant.`desc`, COUNT(like_res.res_id) AS `[Số lượt like]`
FROM like_res
INNER JOIN restaurant ON like_res.res_id = restaurant.res_id
GROUP BY res_id, res_name, Image, `desc`
ORDER BY `[Số lượt like]` DESC
LIMIT 2

--Tìm ra người đã đặt hàng nhiều nhất
SELECT `user`.user_id, `user`.full_name, `user`.email, COUNT(`order`.user_id) AS `[Số lần đặt]`
FROM `order`
INNER JOIN `user` ON `order`.user_id = `user`.user_id
GROUP BY `user`.user_id, `user`.full_name, `user`.email
ORDER BY `[Số lần đặt]` DESC
LIMIT 1

--Tìm ra người không hoạt động (Không order, Không like, Không rate)
SELECT `user`.user_id, `user`.full_name, `user`.email
FROM `user`
LEFT JOIN `order` ON `user`.user_id = `order`.user_id
LEFT JOIN like_res ON `user`.user_id = like_res.user_id
LEFT JOIN rate_res ON `user`.user_id = rate_res.user_id
WHERE `order`.user_id IS NULL AND like_res.user_id IS NULL AND rate_res.user_id IS NULL
GROUP BY `user`.user_id, `user`.full_name, `user`.email