# Задание 1 - Docker CLI

1. Загрузите образ busybox последней версии
```
cosmos@MacBook-Pro-cosmos ~ % docker pull busybox      
Using default tag: latest
latest: Pulling from library/busybox
29f4353257d6: Pull complete 
Digest: sha256:ba76950ac9eaa407512c9d859cea48114eeff8a6f12ebaa5d32ce79d4a017dd8
Status: Downloaded newer image for busybox:latest
docker.io/library/busybox:latest

What's Next?
  View a summary of image vulnerabilities and recommendations → docker scout quickview busybox
```


  2. Запустите новый контейнер busybox с командой ping сайта netology.ru, и количеством пингов 7, поименуйте контейнер pinger
```
cosmos@MacBook-Pro-cosmos ~ % docker run --name pinger -it busybox ping -c 7 netology.ru
PING netology.ru (188.114.98.224): 56 data bytes
64 bytes from 188.114.98.224: seq=0 ttl=63 time=6.255 ms
64 bytes from 188.114.98.224: seq=1 ttl=63 time=6.682 ms
64 bytes from 188.114.98.224: seq=2 ttl=63 time=6.662 ms
64 bytes from 188.114.98.224: seq=3 ttl=63 time=16.003 ms
64 bytes from 188.114.98.224: seq=4 ttl=63 time=6.649 ms
64 bytes from 188.114.98.224: seq=5 ttl=63 time=10.484 ms
64 bytes from 188.114.98.224: seq=6 ttl=63 time=27.231 ms

--- netology.ru ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max = 6.255/11.423/27.231 ms
```


3. Выведите на список всех контейнеров - запущенных и остановленных
```
cosmos@MacBook-Pro-cosmos ~ % docker ps -a
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS                      PORTS     NAMES
75f0a3a79fd0   busybox   "ping -c 7 netology.…"   45 seconds ago   Exited (0) 38 seconds ago             pinger
```


4. Выведите на экран логи контейнера с именем pinger
```
cosmos@MacBook-Pro-cosmos ~ % docker logs pinger
PING netology.ru (188.114.98.224): 56 data bytes
64 bytes from 188.114.98.224: seq=0 ttl=63 time=6.255 ms
64 bytes from 188.114.98.224: seq=1 ttl=63 time=6.682 ms
64 bytes from 188.114.98.224: seq=2 ttl=63 time=6.662 ms
64 bytes from 188.114.98.224: seq=3 ttl=63 time=16.003 ms
64 bytes from 188.114.98.224: seq=4 ttl=63 time=6.649 ms
64 bytes from 188.114.98.224: seq=5 ttl=63 time=10.484 ms
64 bytes from 188.114.98.224: seq=6 ttl=63 time=27.231 ms

--- netology.ru ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max = 6.255/11.423/27.231 ms
```

5. Запустите второй раз контейнера с именем pinger
```
cosmos@MacBook-Pro-cosmos ~ % docker start pinger
pinger
```


6. Выведите на список всех контейнеров - запущенных и остановленных
```
cosmos@MacBook-Pro-cosmos ~ % docker ps -a
CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS                      PORTS     NAMES
75f0a3a79fd0   busybox   "ping -c 7 netology.…"   3 minutes ago   Exited (0) 10 seconds ago             pinger
```


7. Выведите на экран логи контейнера с именем pinger
```
cosmos@MacBook-Pro-cosmos ~ % docker logs pinger 
PING netology.ru (188.114.98.224): 56 data bytes
64 bytes from 188.114.98.224: seq=0 ttl=63 time=6.255 ms
64 bytes from 188.114.98.224: seq=1 ttl=63 time=6.682 ms
64 bytes from 188.114.98.224: seq=2 ttl=63 time=6.662 ms
64 bytes from 188.114.98.224: seq=3 ttl=63 time=16.003 ms
64 bytes from 188.114.98.224: seq=4 ttl=63 time=6.649 ms
64 bytes from 188.114.98.224: seq=5 ttl=63 time=10.484 ms
64 bytes from 188.114.98.224: seq=6 ttl=63 time=27.231 ms

--- netology.ru ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max = 6.255/11.423/27.231 ms
PING netology.ru (188.114.98.224): 56 data bytes
64 bytes from 188.114.98.224: seq=0 ttl=63 time=8.230 ms
64 bytes from 188.114.98.224: seq=1 ttl=63 time=8.347 ms
64 bytes from 188.114.98.224: seq=2 ttl=63 time=7.322 ms
64 bytes from 188.114.98.224: seq=3 ttl=63 time=7.627 ms
64 bytes from 188.114.98.224: seq=4 ttl=63 time=9.527 ms
64 bytes from 188.114.98.224: seq=5 ttl=63 time=18.964 ms
64 bytes from 188.114.98.224: seq=6 ttl=63 time=66.817 ms

--- netology.ru ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max = 7.322/18.119/66.817 ms
```


8. Определите по логам общее количество запусков команды ping и какое общее количество отправленых запросов
```
2 команды пинг по 7 запросов в каждой.
```


9. Удалите контейнер с именем pinger
```
cosmos@MacBook-Pro-cosmos ~ % docker rm pinger
pinger
```


10. Удалите образ busybox
```
cosmos@MacBook-Pro-cosmos ~ % docker rmi busybox
Untagged: busybox:latest
Untagged: busybox@sha256:ba76950ac9eaa407512c9d859cea48114eeff8a6f12ebaa5d32ce79d4a017dd8
Deleted: sha256:23466caa55cb731e1404a17c8a35ac202c16cb952ff210d4ed50a7518b9e9559
Deleted: sha256:90cfead58990dcd68118b592fa008dcd1d278d88014679ffcc2c4e068f698c88
```



# Задание 2 - Environment Variables
Используя Docker CLI выполните следующие действия:

1. Загрузите образ node версии 15.14
2. Запустите контейнер node в интерактивном режиме подключения терминала, поименуйте его mynode, передайте две переменные среды NAME=<ваше имя> и SURNAME=<ваша фамилия>
3. В интерактивной среде выполнения node выполните скрипт, который выведет на экран приветсвтие: Привет, <ваше имя> <ваша фамилия>!, эти данные должны быть получены из переменных среды
4. Остановите контейнер
5. Удалите образ node версии 15.14

```
cosmos@MacBook-Pro-cosmos ~ % docker pull node:15.14
15.14: Pulling from library/node
41f38ce3010a: Pull complete 
ce440adabe2a: Pull complete 
b7c0a158e8c1: Pull complete 
d82fbf846f6f: Pull complete 
c190b75eb2b4: Pull complete 
1ce0b6aec0ac: Pull complete 
d461dd6a01f5: Pull complete 
860542326137: Pull complete 
fba155217a46: Pull complete 
Digest: sha256:608bba799613b1ebf754034ae008849ba51e88b23271412427b76d60ae0d0627
Status: Downloaded newer image for node:15.14
docker.io/library/node:15.14

What's Next?
  View a summary of image vulnerabilities and recommendations → docker scout quickview node:15.14

cosmos@MacBook-Pro-cosmos ~ % docker run -it --name mynode -e NAME=Valeriy -e SURNAME=Litvinov node:15.14
Welcome to Node.js v15.14.0.
Type ".help" for more information.
> console.log(`Привет ${process.env.NAME} ${process.env.SURNAME}`)
Привет Valeriy Litvinov
undefined
> 
(To exit, press Ctrl+C again or Ctrl+D or type .exit)
> 
cosmos@MacBook-Pro-cosmos ~ % docker stop mynode
mynode
cosmos@MacBook-Pro-cosmos ~ % docker rm mynode
mynode
cosmos@MacBook-Pro-cosmos ~ % docker rmi node:15.14
Untagged: node:15.14
Untagged: node@sha256:608bba799613b1ebf754034ae008849ba51e88b23271412427b76d60ae0d0627
Deleted: sha256:c9b1cc6b53791ec5df6210b2d454d12b7a2f181f0a6b0e8f1210c8386473eba7
Deleted: sha256:f0dc5ef6846f0abefa37bc88337c02110e9e238881415ca1871dc2607b786342
Deleted: sha256:784ab9e2e6829251f4fb254d6316e01a98614d225f7cb9c58e2ac6a1ee4797a0
Deleted: sha256:9c7f8185bbc7e06911cf165c28a5807eb0192b2ac627ae633f171af40bd235dd
Deleted: sha256:ddc8c8426aa1933fa5d32a4da29e98ca985692706afa2f1c60975e749ec36aa1
Deleted: sha256:c413e10d9fb99f013b730701affa6aadbec9450a668f993b6c950031c62a1f16
Deleted: sha256:87bf19dbb220eb26f2ee81fdf55d72defc3e924a964e74f0e69fc358fa3c42cf
Deleted: sha256:be106a4e95a9b1906e0289515498911495c3027a49570c4c1f7629aa6e7eb33b
Deleted: sha256:2e550512412623943f8abceb74a40d22e4407bce50f418bda0375a4aaa51b075
Deleted: sha256:5a4eda0f02e647b06a20c608c6c130e1058c6415e2b223acefaa43b6c464aa1b
```

# Задание 3 - Volumes
Используя Docker CLI выполните следующие действия:

1. Загрузите образ node версии 15.14
2. Запустите контейнер с именем first_node из образа node версии 15.14 в фоновом режиме, подключив папку data из текущей директории в /var/first/data контейнера
3. Запустите контейнер с именем second_node из образа node версии 15.14 в фоновом режиме, подключив папку data из текущей директории в /var/second/data контейнера
4. Подключитесь к контейнеру first_node с помощью exec и создайте текстовый файл любого содержания в /var/first/data
5. Добавьте еще один файл в папку data на хостовой машине
6. Подключитесь к контейнеру second_node с помощью exec и получите список файлов в директории /var/second/data, выведете на экран содержимое файлов
7. Остановите оба контейнера
8. Удалите оба контейнера
9. Удалите образ node версии 15.14

```
cosmos@MacBook-Pro-cosmos ~ % docker pull node:20.11
20.11: Pulling from library/node
5665c1f9a9e1: Pull complete 
f419b1a62fc8: Pull complete 
76b4f1810f99: Pull complete 
1c176cbf6497: Pull complete 
22485b2ffedb: Pull complete 
0a7053dca616: Pull complete 
897678f6e6f6: Pull complete 
5b70bed8970a: Pull complete 
Digest: sha256:ffebb4405810c92d267a764b21975fb2d96772e41877248a37bf3abaa0d3b590
Status: Downloaded newer image for node:20.11
docker.io/library/node:20.11

What's Next?
  View a summary of image vulnerabilities and recommendations → docker scout quickview node:20.11
cosmos@MacBook-Pro-cosmos ~ % ls 
Applications    Bitrix24        Desktop         Documents       Downloads       Library         Movies          Music           Pictures        Postman         Public
cosmos@MacBook-Pro-cosmos ~ % mkdir data
cosmos@MacBook-Pro-cosmos ~ % ls
Applications    Bitrix24        Desktop         Documents       Downloads       Library         Movies          Music           Pictures        Postman         Public          data
cosmos@MacBook-Pro-cosmos ~ % docker run --name first_node -d -v ~/data:/var/first/data node:20.11 /bin/sleep infinity
d71ad59ae34a7125b98b42ee69a9035350f4c1aba46c5b6e3d6cdebfe301d5d1
cosmos@MacBook-Pro-cosmos ~ % docker run --name second_node -d -v ~/data:/var/second/data node:20.11 /bin/sleep infinity
2578e629eaef4dc80212ff8427cbcf32d9d48d174236bc671597d2e7763d67a1
cosmos@MacBook-Pro-cosmos ~ % docker ps   
CONTAINER ID   IMAGE        COMMAND                  CREATED          STATUS          PORTS     NAMES
2578e629eaef   node:20.11   "docker-entrypoint.s…"   6 seconds ago    Up 6 seconds              second_node
d71ad59ae34a   node:20.11   "docker-entrypoint.s…"   45 seconds ago   Up 45 seconds             first_node
cosmos@MacBook-Pro-cosmos ~ % docker exec -it first_node /bin/sh
# ls
bin  boot  dev  etc  home  lib  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
# cd var/first/data
# touch test.txt
# ls
test.txt
# echo "this is a new line" >> test.txt                                
# more test.txt
this is a new line
# touch second_test.txt
# exit
cosmos@MacBook-Pro-cosmos ~ % docker exec -it second_node /bin/sh
# ls
bin  boot  dev  etc  home  lib  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
# cd var/second/data
# ls
second_test.txt  test.txt
# cat test.txt
this is a new line
# cat second_test.txt
# exit 
cosmos@MacBook-Pro-cosmos ~ % docker stop first_node
first_node
cosmos@MacBook-Pro-cosmos ~ % docker stop second_node
second_node                                                                 
cosmos@MacBook-Pro-cosmos ~ % docker rm first_node second_node
first_node
second_node
cosmos@MacBook-Pro-cosmos ~ % docker rmi node:20.11
Untagged: node:20.11
Untagged: node@sha256:ffebb4405810c92d267a764b21975fb2d96772e41877248a37bf3abaa0d3b590
Deleted: sha256:8a904502518f008a34c55cc00e9c8de67049c52ab2fbc47a6c9b7ad468c843c6
Deleted: sha256:c01967625ec550fd4d09ffc97c50e33328a03a903095d20f7fd5d417fc4f1aaf
Deleted: sha256:2f38583a688d2221a8a04fcac2ca5d6e75f1b0256d9f7f3a4cc4012ec3cdd9eb
Deleted: sha256:e046ad8b7f173842960d2f9a7c175c22a29d845644bfc8137359e2fc1e634dc8
Deleted: sha256:67e7504662a03378a9736e5323d144f8f482a5cad573f37212649a048a31d808
Deleted: sha256:2fe045b0c3c80a255db9459f0b7b12d74c6c7c0db6c71b3ddd9022197fe9b990
Deleted: sha256:3e6b1574348fc87e670ba5aaf09e3e064fa292cd4f2aa209b2855e2b1540f7c1
Deleted: sha256:6b321639f2d38891ebe3e3952740f4a15ae5d9b57213311173e1bba060aea786
Deleted: sha256:77ad615d04d44851061fc9c4340bdd0134b18a878e3c170ecf305dca2ddcfc62
```
