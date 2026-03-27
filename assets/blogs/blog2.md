Cache It or Lose It: The Power⚡of LRU
=====================================

[![Abhijith M S](https://miro.medium.com/v2/resize:fill:64:64/1*jYWE0Ldgmzrctv-63kLlwQ.jpeg)](https://medium.com/@ams_132?source=post_page---byline--b669b43e527b---------------------------------------)

[Abhijith M S](https://medium.com/@ams_132?source=post_page---byline--b669b43e527b---------------------------------------)

7 min read

·

Jan 8, 2025

[nameless link](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fp%2Fb669b43e527b&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40ams_132%2Fcache-it-or-lose-it-the-power-of-lru-b669b43e527b&user=Abhijith+M+S&userId=93ef70aee8c8&source=---header_actions--b669b43e527b---------------------clap_footer------------------)

--

[nameless link](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fbookmark%2Fp%2Fb669b43e527b&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40ams_132%2Fcache-it-or-lose-it-the-power-of-lru-b669b43e527b&source=---header_actions--b669b43e527b---------------------bookmark_footer------------------)

Listen

Share

All that you need to know about Caching and a implementation of LRU Caching in Rust 🦀

![Generated with Leonardo.ai](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*RPnlhU4_oqvHf6CAab_pxQ.jpeg)

What is a Cache ?
-----------------

In computing, a Cache is a software or hardware component in a system which aids the system by increasing its performance. It stores data so that any future requests for that data can be served faster. The data stored could be the result of an earlier computation or a copy of the data stored elsewhere. It basically helps a system increase its performance by improving the availability of required data through a compromise of memory by storing the required data elsewhere.

A **Cache Hit** ✅ occurs when the requested data was found in the cache and a **Cache Miss** ❎ occurs when the requested data was not found in the cache.

We will be primarily be discussing about caches with respect to software.

Software Caches 💽
------------------

So these caches basically store data in order to speed up the process of data retrieval by having better availability of the requested data. It could be anything from storage unit to just a simple data structure like a HashMap. It could be in different formats like:

1.  **Disk cache 💾** : A disk cache is a type of cache that stores frequently accessed or recently used data on a disk (such as a hard drive or solid-state drive).
2.  **Web cache** 🗄️: Here proxy servers could be setup in a network to store data that is frequently accessed by many users. It could cache web pages or images to speed up the process when a client requests for a certain web page.
3.  **Memoization** 📝 **:** It is a optimization techniques that involves caching the result for compute intensive function calls onto a Hashtable for faster retrieval. It is done to avoid repetitive computation.
4.  **CDN** 🚚 **: Content Delivery Network** speed up the delivery of static content, such as HTML pages, images and videos by replicating the content in multiple servers around the world and delivering it to users based on location.

Cache Implementation in Rust 🦀
-------------------------------

Here we will see how to build a basic yet efficient Least Recently Used (**LRU**) cache system in Rust, with an eviction policy.

We will start with a basic implementation and then move on with adding features like efficient tracking of item usage, concurrency support ( and will probably add the integration of eviction callbacks to handle resource cleanup upon item removal 😋)

### Basic Approach

```
// Implementing a basic key-value cache without an eviction policy
use std::collections::HashMap;
use std::hash::Hash;
pub struct Cache<K,V> where K: Eq + Hash + Clone {
    storage: HashMap<K, V>,
}
impl<K, V> Cache<K, V> where K: Eq +  Hash + Clone {
    pub fn new() -> Self {
        Cache {
            storage: HashMap::new(),
        }
    }
    pub fn set(&mut self, key: K, value: V) {
        self.storage.insert(key, value);
    }
    pub fn get(&self, key: &K) -> Option<&V> {
        self.storage.get(key)
    }
}
fn main(){
    let mut cache = Cache::new();
    cache.set("key1","value1");
    cache.set("key2","value2");
    if let Some(value) = cache.get(&"key1") {
        println!("Found value: {}", value);
    } else {
        println!("value not found");
    }
    match cache.get(&"key2") {
        Some(val) => println!("Found value: {}", val),
        None => println!("Value not found")
    }
    match cache.get(&"key4") {
        Some(val) => println!("Found value: {}", val),
        None => println!("Value not found")
    }
}
```

Here we initialize a struct **_Cache_** which creates a HashMap on instantiating the **_Cache_** struct. A HashMap is a data structure that is used to store and retrieve values based on keys. **_set_** and **_get_** methods are added in order to insert key-value pairs and retrieve value based on the key respectively.

This is a very basic implementation of a cache. Now let's add more features and make it more efficient. 😋

### Implementing an eviction policy

The cache will have a fixed size due to which we will have to decide which data to keep and which data to remove. It could be on different factors like priority, least recently used etc. Different eviction policies:

*   Least Recently Used (LRU)
*   First In, First Out (FIFO)
*   Least Frequently Used (LFU)
*   Time-Based Expiration (TTL or Time-to-Live)
*   Weighted Least Recently Used (WLRU)
*   Segmented LRU (SLRU)
*   _and many more ..._

We will be using Least Recently Used (LRU) as the eviction policy. An LRU cache evicts the least recently accessed item when the cache reaches its capacity in order to add new items into the cache.

We will enhance the previous example by adding a fixed capacity to the cache and also track the usage of each item in the cache using a combination of a **_HashMap_** and a **_VecDeque_** (a double ended queue). The **_VecDeque_** is used to store the order of usage of the items stored while the **_HashMap_** is used to store the actual data as key-value pairs.

```
// Implementing a key-value cache with an LRU policy using a HashMap and double ended queue
use std::collections::{HashMap, VecDeque};
use std::hash::Hash;
pub struct LRUCache<K, V> where K: Eq +  Hash + Clone {
    storage: HashMap<K, V>,
    capacity: usize,
    usage_order: VecDeque<K>,
}
impl<K, V> LRUCache<K, V> where K: Eq + Hash + Clone {
    pub fn new(capacity: usize) -> Self {
        assert!(capacity>0, "Cache size cannot be 0");
        LRUCache {
            storage: HashMap::new(),
            capacity: capacity,
            usage_order: VecDeque::new(),
        }
    }
    pub fn set(&mut self, key: K, value: V) {
        self.storage.insert(key.clone(),value);
        self.update_usage(&key);
        if self.storage.len() > self.capacity {
            if let Some(least_used_key) = self.usage_order.pop_back() {
                self.storage.remove(&least_used_key);
            }
        }
    }
    pub fn get(&mut self, key: &K) -> Option<&V> {
        if self.storage.contains_key(key) {
            self.update_usage(key);
            self.storage.get(key)
        } else {
            None
        }
    }
    // Updates the position of keys
    fn update_usage(&mut self, key: &K) {
        self.usage_order.retain(|existing_key| existing_key!=key);
        self.usage_order.push_front(key.clone());
    }
}
fn main() {
    let mut cache = LRUCache::new(2);
    cache.set("key1","val1");
    cache.set("key2","val2");
    cache.set("key4","val4");
    println!("key1 : {:?}",cache.get(&"key1"));
    cache.set("key3","val3");
    match cache.get(&"key4") {
        Some(val) => println!("key4 : {}",val),
        None => println!("No value found")
    }
}
```

Here you can notice that the cache is instantiated with a capacity of 2, meaning it can store a maximum of 2 items. Key-value <key1:val1> is stored onto the cache followed by Key-value <key2:val2>, then Key-value <key4:val4> is stored. On trying to add Key-value <key4:val4>, Key-value <key1:val1> is evicted as it is the least recently used key-value pair. Then Key-value <key4:val4> is added to the cache.

The above example is modified by using doubly-linked list for efficient tracking.

```
// Implementing a key-value cache with an LRU policy using a HashMap and doubly linked list for better order tracking
use std::collections::HashMap;
use std::rc::{Rc, Weak};
use std::cell::RefCell;
use std::hash::Hash;
struct Node<K, V> {
    key: K,
    value: V,
    prev: Option<Weak<RefCell<Node<K, V>>>>,
    next: Option<Rc<RefCell<Node<K, V>>>>,
}
impl<K, V> Node<K, V> {
    fn new(key: K, value: V) -> Rc<RefCell<Self>> {
        Rc::new(RefCell::new(Node {
            key,
            value,
            prev: None,
            next: None,
        }))
    }
}
pub struct LRUCache<K, V> where K: Eq + Hash + Clone {
    capacity: usize,
    map: HashMap<K, Rc<RefCell<Node<K, V>>>>,
    head: Option<Rc<RefCell<Node<K, V>>>>,
    tail: Option<Rc<RefCell<Node<K, V>>>>,
}
impl<K: Eq + Hash + Clone, V: Clone> LRUCache<K, V> {
    pub fn new(capacity: usize) -> Self {
        assert!(capacity > 0, "Cache capacity must be greater than 0");
        LRUCache {
            capacity,
            map: HashMap::new(),
            head: None,
            tail: None,
        }
    }
    
    pub fn set(&mut self, key: K, value: V) {
        if let Some(node) = self.map.get(&key).cloned() {
            node.borrow_mut().value = value;
            self.detach(&node);
            self.attach(node);
        } else {
            let new_node = Node::new(key.clone(), value);
            if self.map.len() >= self.capacity {
                if let Some(lru_key) = self.tail.as_ref().map(|node| node.borrow().key.clone()) {
                    self.remove(&lru_key);
                }
            }
            self.map.insert(key, new_node.clone());
            self.attach(new_node);
        }
    }
    pub fn get(&mut self, key: &K) -> Option<V> {
        self.map.get(key).cloned().map(|node| {
            let value = node.borrow().value.clone();
            self.detach(&node);
            self.attach(node);
            value
        })
    }
    fn remove(&mut self, key: &K) -> Option<V> {
        self.map.remove(key).map(|node| {
            self.detach(&node);
            node.borrow().value.clone()
        })
    }
    fn detach(&mut self, node: &Rc<RefCell<Node<K, V>>>) {
        let mut node = node.borrow_mut();
        
        match (node.prev.take(), node.next.take()) {
            (None, None) => {
                // Node was the only one in the list
                self.head = None;
                self.tail = None;
            }
            (None, Some(next)) => {
                // Node was the head
                next.borrow_mut().prev = None;
                self.head = Some(next);
            }
            (Some(prev), None) => {
                // Node was the tail
                if let Some(prev) = prev.upgrade() {
                    prev.borrow_mut().next = None;
                    self.tail = Some(prev);
                }
            }
            (Some(prev), Some(next)) => {
                // Node was in the middle
                if let Some(prev) = prev.upgrade() {
                    prev.borrow_mut().next = Some(next.clone());
                    next.borrow_mut().prev = Some(Rc::downgrade(&prev));
                }
            }
        }
    }
    fn attach(&mut self, node: Rc<RefCell<Node<K, V>>>) {
        match self.head.take() {
            Some(old_head) => {
                old_head.borrow_mut().prev = Some(Rc::downgrade(&node));
                node.borrow_mut().next = Some(old_head.clone());
                self.head = Some(node);
            }
            None => {
                // List was empty
                self.head = Some(node.clone());
                self.tail = Some(node);
            }
        }
    }
}
fn main() {
    let mut cache = LRUCache::new(2);
    cache.set("key1", "value1");
    cache.set("key2", "value2");
    println!("Retrieved: {:?}", cache.get(&"key1")); // Access key1, making it most recently used
    cache.set("key3", "value3"); // Should evict key2 as it is the least recently used
    match cache.get(&"key2") {
        Some(value) => println!("Retrieved: {:?}", value),
        None => println!("Key2 was evicted"), // Expected outcome
    }
    // Verify key3 is in the cache
    match cache.get(&"key3") {
        Some(value) => println!("Key3 is in cache with value: {:?}", value),
        None => println!("Key3 is not in cache (unexpected)"),
    }
}
```

Each node in the list contains a key-value pair, and the list maintains pointers to the most and least recently used items. When an item is accessed or added, it's moved to the front of the list. If the cache exceeds its capacity, the item at the end of the list (the least recently used item) is removed.

References
----------

1.  [https://medium.com/dev-genius/a-simple-cache-system-in-rust-7cf3d2489607](https://medium.com/dev-genius/a-simple-cache-system-in-rust-7cf3d2489607)
2.  [https://en.wikipedia.org/wiki/Cache_(computing)](https://en.wikipedia.org/wiki/Cache_(computing))

Hope you enjoyed it !!!

Stay tuned and Do make sure to check out my articles [@ams_132](https://medium.com/@ams_132) !!!

So always remember _Everything's faster when you cache your way through life._ 😉

_Sayonara until next time..._