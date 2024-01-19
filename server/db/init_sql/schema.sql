CREATE TABLE
  IF NOT EXISTS user (
    id text PRIMARY KEY UNIQUE NOT NULL,
    username text UNIQUE NOT NULL,
    email text UNIQUE NOT NULL,
    password text NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    age number NOT NULL,
    first_name text,
    last_name text,
    gender text,
    image_url text
  );

CREATE TABLE
  IF NOT EXISTS reaction (
    id text PRIMARY KEY UNIQUE NOT NULL,
    emoji text NOT NULL,
    description text NOT NULL
  );

CREATE TABLE
  IF NOT EXISTS category (
    id text PRIMARY KEY UNIQUE NOT NULL,
    name text,
    description text
  );

CREATE TABLE
  IF NOT EXISTS parentReaction (
    id text PRIMARY KEY UNIQUE NOT NULL,
    user_id text NOT NULL,
    reaction_id text NOT NULL,
    parent_id text NOT NULL,
    parent_type text NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (reaction_id) REFERENCES reaction (id)
  );

-- POST DB INITIALIZATION --
CREATE TABLE
  IF NOT EXISTS post (
    id text PRIMARY KEY UNIQUE NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    user_id text NOT NULL,
    image_url text NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user (id)
  );

CREATE TABLE
  IF NOT EXISTS postCategory (
    id text PRIMARY KEY UNIQUE NOT NULL,
    post_id text NOT NULL,
    category_id text NOT NULL,
    FOREIGN KEY (post_id) REFERENCES post (id),
    FOREIGN KEY (category_id) REFERENCES category (id)
  );

CREATE TABLE
  IF NOT EXISTS comment (
    id text PRIMARY KEY UNIQUE NOT NULL,
    user_id text NOT NULL,
    post_id text NOT NULL,
    parent_id text,
    content text NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (post_id) REFERENCES post (id),
    FOREIGN KEY (parent_id) REFERENCES comment (id)
  );

-- CHAT DB INITIALIZATION --
CREATE TABLE
  IF NOT EXISTS chat (id text PRIMARY KEY UNIQUE NOT NULL);

CREATE TABLE
  IF NOT EXISTS chatUser (
    id text PRIMARY KEY UNIQUE NOT NULL,
    user_id text NOT NULL,
    chat_id text NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (chat_id) REFERENCES chat (id)
  );

CREATE TABLE
  IF NOT EXISTS textLines (
    id text PRIMARY KEY UNIQUE NOT NULL,
    chat_id text NOT NULL,
    user_id text NOT NULL,
    content text NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chat_id) REFERENCES chat (id),
    FOREIGN KEY (user_id) REFERENCES user (id)
  );

INSERT INTO
  user (
    id,
    username,
    email,
    password,
    age,
    first_name,
    last_name,
    gender,
    image_url
  )
VALUES
  (
    'user_1',
    'john_doe',
    'john.doe@example.com',
    'hashed_password_1',
    28,
    'John',
    'Doe',
    'Male',
    'http://example.com/images/john_doe.png'
  ),
  (
    'user_2',
    'jane_smith',
    'jane.smith@example.com',
    'hashed_password_2',
    32,
    'Jane',
    'Smith',
    'Female',
    'http://example.com/images/jane_smith.png'
  ),
  (
    'user_3',
    'alex_jones',
    'alex.jones@example.com',
    'hashed_password_3',
    25,
    'Alex',
    'Jones',
    'Non-Binary',
    'http://example.com/images/alex_jones.png'
  ) ON CONFLICT DO NOTHING;

INSERT INTO
  reaction (id, emoji, description)
VALUES
  ('reaction_1', '😀', 'Happy'),
  ('reaction_2', '😢', 'Sad'),
  ('reaction_3', '👍', 'Like') ON CONFLICT DO NOTHING;

INSERT INTO
  category (id, name, description)
VALUES
  (
    'category_1',
    'Technology',
    'Discussions related to technology and gadgets.'
  ),
  (
    'category_2',
    'Cooking',
    'Share and discover new recipes.'
  ),
  (
    'category_3',
    'Travel',
    'Share travel stories and advice.'
  ) ON CONFLICT DO NOTHING;