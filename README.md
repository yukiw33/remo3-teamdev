# Group-F

1. 全体概要
1.1 システムの概要
本システムは，Nature Remo 3に内蔵されたセンサの情報をもとに，登録されているエアコンの操作を行うことによって，快適な室内環境を維持する．
エアコンを操作する際の基準には，室内の温度・湿度から計算される不快指数を用いる．
本システムで実現する主な機能を以下に示す．
センサ情報の記録
温度
湿度
スプレッドシートでの計算
不快指数の計算
LINEを介したやりとり
センサ情報の通知
エアコン操作の指定
エアコンの操作
エアコンの起動
温度の調節

1.2 想定する利用者
本システムは，赤外線リモコンにより操作可能なエアコンを設置しており，LINEを使用することができるすべてのユーザが対象である．不快指数が一定の基準よりも高いときにはLINE Botが知らせてくれるため，熱中症対策として利用することができる．さらに，この通知をもとにLINEから操作が可能であることから，特に以下のようなユーザに適している．
リモコンによってエアコンを操作するのが面倒であると感じているユーザ
リモコンをすぐに無くしてしまうユーザ
小さい子どもがおり，子どもと同じ部屋にいない時間の多いユーザ
介護が必要な高齢の親がいるユーザ

2. 機能要求
2.1 センサ情報の記録
ユーザは，Googleスプレッドシート上で1時間おきに記録された室内温度（摂氏），湿度，不快指数，人の動きを確認可能であること．
なお，不快指数は以下の計算式で求めることができる値である．
0.81温度+0.01湿度(0.99温度-14.3)+46.3
この値80を上回ると，多くの人が暑いと感じるとされている．

2.2 LINEを介したやりとり
不快指数が80以上の場合，ユーザはLINE Botから室内環境に関する通知を受け取ること．
ユーザは，LINE Botに特定のメッセージを送信することでLINEを介したエアコンの操作が可能であること．

2.3 エアコンの操作
ユーザは，リモコンを使わずに自分の意思で、エアコンの電源をONやOFFにしたり，温度調節を行ったりすることが可能であること．




プロジェクトの全てが詰まった資料ドライブ
https://drive.google.com/drive/folders/1Pb34fKwYTj4vyF5h1Krz2gbzXKcEjqkc?usp=sharing

進捗管理シート
https://docs.google.com/spreadsheets/d/17ISuqmwEXN6HeQr115quj4L3hPpeiINQgusPRELkBso/edit?usp=sharing
