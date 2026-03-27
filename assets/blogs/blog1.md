Building Hyphora: A Distributed KV Store with a Bitcask Soul
============================================================

[![Abhijith M S](https://miro.medium.com/v2/resize:fill:64:64/1*jYWE0Ldgmzrctv-63kLlwQ.jpeg)](https://medium.com/@ams_132?source=post_page---byline--3f44c4ff9ba8---------------------------------------)

[Abhijith M S](https://medium.com/@ams_132?source=post_page---byline--3f44c4ff9ba8---------------------------------------)

7 min read

·

Nov 16, 2025

[nameless link](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fp%2F3f44c4ff9ba8&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40ams_132%2Fbuilding-hyphora-a-distributed-kv-store-with-a-bitcask-soul-3f44c4ff9ba8&user=Abhijith+M+S&userId=93ef70aee8c8&source=---header_actions--3f44c4ff9ba8---------------------clap_footer------------------)

--

[nameless link](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fbookmark%2Fp%2F3f44c4ff9ba8&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40ams_132%2Fbuilding-hyphora-a-distributed-kv-store-with-a-bitcask-soul-3f44c4ff9ba8&source=---header_actions--3f44c4ff9ba8---------------------bookmark_footer------------------)

Listen

Share

This is about my experience building [**_Hyphora_**](https://github.com/AMS003010/Hyphora) and why I built it 😅

![Generated on Leonardo.ai](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ptpoKDh38uBfQpyH3_5ywA.jpeg)

Hyphora is a distributed Key-Value store with a bitcask storage backend inspired by how each unit in the mycelium maintains consensus of their biological composition with each other.

```
# Hyphora
Derived from Hyphae (/ˈhʌɪfə/) -- the branching filaments that
make up the mycelium of a fungus
```

Are you one of those people who'd rather tinker your way through a problem in the hardest possible way instead of simply spending money 💸 and choosing the easy route?
Well, I definitely am 😝.

That's exactly what happened when I built my makeshift home lab. It gave me a sense of freedom like nothing else (and also kept me from breaking things on my academic laptop 😅).

I enjoy diving into random topics I stumble across on the internet from [_distro hopping_](https://mrsauravsahu.medium.com/getting-started-with-linux-a-guide-to-distro-hopping-2cd4c58bfb22) to [_zero allocation logging_](https://github.com/rs/zerolog), from [_appreciating random rices_](https://www.reddit.com/search/?q=ricing+linux&cId=e4ba3ea5-50de-4642-b9b4-d7b3ae5a2086&iId=5c257236-2abc-446e-9c93-66868b290908) to exploring [_flat buffers_](https://flatbuffers.dev/) and of course, playing Minecraft.

I always wanted something in my home lab that could

*   store _{ "WORLD_SEED" = "712394561" }_ in each of my servers (mostly _raspberry pi's_ 😝) in my home lab
*   allow for a file on one node (like _rockyou.txt_ 😈_)_ to be available across multiple nodes

Building a distributed key-value store seemed like the solution (also because I wanted to build something this cool 😏 from a long time).

[_Bitcask_](https://arpitbhayani.me/blogs/bitcask/) having one of the most easy to understand architectures and still very performant became my first choice for a storage engine!!

So this the story of [_Hyphora_](https://github.com/AMS003010/Hyphora) and how it came to be 🤘

Main components of Hyphora🌿
----------------------------

*   **_Key-Value store_** (Built from scratch)
*   **_Raft_** (Using Hashicorp's Raft library)
*   **_Bitcask_** (Built from scratch)

### Key-Value store

_This is a data storage paradigm where data is stored as { key : value } pairs. Simply think of it as a database where every value that you store is associated and identified by its key. So if you want to modify it then the current value of the key is modified and if you delete the key then the whole { key : value } pair is deleted._

![Representation of a key value store](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*XcsjyrnYx-AnIVDEoe-PTw.png)

### Raft

_A consensus algorithm is a core part of any distributed system and a consensus algorithm simply means an algorithm responsible to ensure that all the nodes in a cluster agree upon a value to consider it as a valid value. Raft is a consensus algorithm responsible to distribute a state machine across a cluster of machines. It achieves consensus via a elected leader. Here every write operation that happens is sent to the leader which appends it to its log and replicates it to others as AppendEntries before executing it. As for a read operation it can be done on any of the nodes_ (_Be careful of the stale values_)_. Know more about it at_ [_Raft_](https://raft.github.io/)_._

![Raft is a leader follower consensus algorithm](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*fo5YpQKUGMKlb63jwDAqVg.png)

### Bitcask

_Bitcask is a storage paradigm designed to handle high Read-Write throughput. Just think of it as designing a storage engine which can perform pretty well under high load situations. A storage engine is simply a makes-it-sound-cool term for a core part of the database which will handle all the primary functions._

These are the primary functions for the _bitcask_ backend

*   Store a _{ key : value }_
*   Get the _value_ for a _key_
*   Delete a _key_

The main components of _bitcask_ are

*   An in-memory hashmap of _{ key : value }_ pairs
*   A set of append-only files which will serve as a persistent store ( they are simply a folder with data-*.db files )

![Components of Bitcask](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*LEOWCspzlRf9-KKuoRXtLQ.png)

I'll tell later why there are duplicate values for the several keys in the _data-*.db_ files in the image. Hold tight ! 🙃

_So how does it work_ 🧐 _Lets take an example_

Suppose you store a _{ ore_spawn_rate: 0.004 }_

*   This is added to a append-only file (here _data-1.db_).
*   Added to the _hashmap_ as well

This allows for 2 things

*   Fast reads for the value of a key from the _hashmap_ as a it provides O(1) access to the value
*   If the key is not there already, then the _{ key : value }_ pair is appended to _data-1.db_. If the key is already there, you do not go through all the files and get the latest value instead you simply append it !! This helps with handling high write situations as you do not hold the lock too long.

After adding _{ ore_spawn_rate: 0.004 },_ it will look like

![After adding { ore_spawn_rate: 0.004 }](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*WDeWtlIAjJRQAvfm7AKGcQ.png)

What if I now add _{ ore_spawn_rate: 0.6 }_ 🧐

the pair will be appended to the data-1.db (instead of updating the previous entry of _ore_spawn_rate_) and then the value for _ore_spawn_rate_ in the _hashmap_ will be updated. It will look like this.

![After adding { ore_spawn_rate: 0.6 }](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*c9ORxVSj4vLjS2THZDhAjg.png)

Cool 😄 now we have a system to get the value to a key in O(1) and also allow addition of _{ key : value }_ pairs without having to hold the lock too long. 🎊

Now how does delete happen 🧐

Here if we were to delete _ore_spawn_rate_ then a _tombstone_ is inserted into the _data-1.db_ and the key is removed from the _hashmap._ A _tombstone_ is simply a marker value to indicate that the key has been deleted.

This is how it will look ...

![After deleting ore_spawn_rate](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*v9SVV9cmERj8x1CSKtrmgQ.png)

Superb 🥳 we have all these working !!

*   Add a _{ key : value }_
*   Get a _key_
*   Delete a _key_

Lets now talk about the append-only files ...

Whenever the size of a append-only file reaches a threshold (could be the size of the file) then it closes that file and opens the next one to append the _{ key : value }_ pair. So the files go on as _data-0.db_, _data-1.db_, _data-2.db_, _data-3.db_ etc.

Have you noticed something, what if we kept entries to the same _key,_ the append-only files will grow and become huge and you will notice the ratio of size taken by append-only files to the size of the actual _{ key : value }_ pairs will be high number due to high redundancy. This is solved by a process called compaction.

_Compaction is a process where you run through all the files and get all the keys along with their latest value and then write it to a new set of append-only files replacing the old one, due to which you massively reduce the number of files. Compaction is a very expensive operation and it happens periodically to ensure the database does not grow too big._

Lets now talk about the in-memory _hashmap_ ...

One of the major drawbacks of the _Bitcask_ paradigm is that the size of the in-memory _hashmap_ is limited by the available RAM. In general, keys tend to be small, while values can range from a single word to an entire file. So imagine storing a _hashmap_ whose values are _insanely_ large in RAM -
this will inevitably lead to an out-of-memory problem! 💀

A solution to this is to store the _key_ and the file-name and seek-value for the _value_ in the _hashmap._

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*R9Gf4xprPCedbJBLgATGHA.png)

So here the _hashmap_ says that the latest value to key _favourite_book_ is in file _data-1.db_ and at an offset of 44 from the beginning of the file. This allows you to immediately get (_seek_) the latest value from the exact file and helps the _hashmap_ to exist in in-memory (without growing too big).

Conclusion
----------

Looks like we have a distributed key-value store now allowing for add, get, delete operations with a compaction process running periodically. This satisfies my 1st requirement 🥳.

![A cluster of nodes](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*yYeHCdvxEnIWHlxVnzrXZg.png)

My 2nd requirement is being able to replicate a file to all nodes. Imagine I'm working on _Node D_ having file _File_1.txt_. I want the same file to be available in other nodes. 😤 (_For some weird reason_ 😅)

Since I already had a functional distributed key-value store, I decided to reuse it 😅 because a file can be represented as _{ key : value }_ pair where _file_name_ can serve as the _key_ and the _file_content_ can serve as the _value_.

Cool !! We have met both requirements. Looks like we just built ourselves a distributed key-value store with a _bitcask_ backend. ☺️

Check out [_Hyphora_](https://github.com/AMS003010/Hyphora) !!

### References

*   [https://arpitbhayani.me/blogs/bitcask](https://arpitbhayani.me/blogs/bitcask/)
*   [https://notes.eatonphil.com/minimal-key-value-store-with-hashicorp-raft.html](https://notes.eatonphil.com/minimal-key-value-store-with-hashicorp-raft.html)
*   [https://a3y3.dev/distributed-systems/2022/07/24/kv-store.html](https://a3y3.dev/distributed-systems/2022/07/24/kv-store.html)
*   [https://rowjee.com/the_replicated_log/0002](https://rowjee.com/the_replicated_log/0002)

_Do_ 👏 _If you liked the article and check out my articles_ [_@ams_132_](https://medium.com/@ams_132) _!!!_

_Sayonara until next time..._