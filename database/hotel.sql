use TravelApp;

CREATE TABLE hotel (
    search_id INT AUTO_INCREMENT PRIMARY KEY,
    destination VARCHAR(100) NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    rooms INT DEFAULT 1,
    guests INT DEFAULT 1,
    search_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from hotel;
