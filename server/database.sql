CREATE DATABASE trawellbuddy;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  google_id VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255),
  displayname VARCHAR(255),
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  picture VARCHAR(256),
  mobile numeric(10)
);

CREATE TABLE journeys(
  id SERIAL PRIMARY KEY,
  train_id VARCHAR(25),
  departure VARCHAR(50),
  departure_date DATE,
  arrival_date DATE,
  arrival VARCHAR(50),
  pnr VARCHAR(50),
  booking_status VARCHAR(10),
  traveller_id VARCHAR(255)  references users(google_id) NOT NULL
);