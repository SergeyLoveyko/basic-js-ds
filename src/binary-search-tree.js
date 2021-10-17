// const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
/* 
class Node {                    //  Узел
    constructor(data) {         //  Получаем значение
        this.data = data;       //  Значение будем присваивать нашему объекту
        this.left = null;       //  А так же след. после нашего УЗЛА = null
        this.right = null;      //  А так же след. после нашего УЗЛА = null
    }
} */

module.exports = class BinarySearchTree {
  constructor() {
    this.base = null;
  }

  root() {
    return this.base;
  }

  add(data) {
    this.base = addWithin(this.base, data);    //  Положи пожалуйста в наш КОРЕНЬ, что ВЕРНЁТ наша  "функция" 
    //  "Функция" говорит - добавь внутырь какого-то под-дерева (this.root), некое Значение (value)
    function addWithin(node, data) {   //  Находясь на какой-то ВЕРИШИНЕ, поняли что нужно идти (либо влево либо в право)
      if (!node) {                    //  Если у нас УЗЛА НЕТ
        return new Node(data);     //  То самое время доюавить НОВЫЙ УЗЕЛ
      }

      if (node.value === data) {     //  Если такой УЗЕЛ уже СУЩЕСТВУЕТ. Мы дошли нашем пермещением(либо в право либо в лево) к нужному месту, куда нужно ставить элемент. И ЗНАЧЕНИЕ в этом УЗЛЕ Совпадает со ЗНАЧЕНИЕМ с тем элементом что мы хотим ДОБАВИТЬ
        return node;    //  Мы ничего Нового НЕ ДЕЛАЕМ. Мы просто ВОЗВРАЩАЕМ текущий УЗЕЛ
      }

      if (data < node.data) {   //  Если ЗНАЧЕНИЕ которое мы хотим ДОБАВИТЬ, меньше чем ЗНАЧЕНИЕ в текущем УЗЛЕ
        node.left = addWithin(node.left, data);    //  Мы говорим. Что у этого УЗЛА (левый потомок), будет Иметь то ЗНАЧЕНИЕ которое нам вершёт МЕТОД "addWithin(node.left, value)"
      } else {                  //  Иначе
        node.right = addWithin(node.right, data);  //  Мы пойдём в (правое под-дерево). И скажем, что ПРАВЫЙ потомок текущего УЗЛА, Будет = результату того, что вершёт МЕТОД "addWithin(node.right, value)"
      }

      return node;    //  Далее. Мы вернём текущий УЗЕЛ

      //  Метод  "addWithin"  юудет ОБНОВЛЯТЬ по тихонуку все наши УЗЛЫ
      //  И в конце концов. Кошда мы додём до  "ВАКАНТНОГО МЕСТА", т.е. ДО ПУСТОЙ ПОЗИЦИИ
      //  Мы добавим наш НОВЫЙ УЗЕЛ

      //  И именно он будет (либо левым, либо правым) потомком для Существующего УЗЛА
    }
  }

  has(data) {
    return searchWithin(this.base, data);

    function searchWithin(node, data) {
      if (!node) {          //  Если УЗЛА НЕТ (в левом и правоим под-дереве)
        return false;     //  И пришли на ПУСТУЮ позицию. ОТДАЁМ  "false"
      }

      if (node.data === data) {     //  Если мы НАШЛИ нужное ЗНАЧЕНИЕ. Значение в нашем УЗЛЕ  СОВПАДАЕТ с искомым ЗНАЧЕНИЕМ
        return true;
      }

      return data < node.data ?
        searchWithin(node.left, data) :
        searchWithin(node.right, data);
    }
  }

  find(data) {
    return findWithin(this.node, data);

    function findWithin(node, data) {
      if (!node) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      return data < node.data ?
        findWithin(node.left, data) :
        findWithin(node.right, data);
    }
  }

  remove(data) {
    this.base = removeNode(this.base, data);  //  Удали УЗЕЛ. В каком поддереве (this.root) и с каким ЗНАЧЕНИЕМ (data)

    function removeNode(node, data) {
      if (!node) {        //  Если у нас не было УЗЛА. Т.е. там был  "null"
        return null;      //  То мы этот  "null"
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;    //  ВЕРНИ обновлённое поддерево
      } else {          //  ЗНАЧЕНИЕ = тому что находится в УЗЛЕ
        if (!node.left && !node.right) {  //  Вдруг текущий УЗЕЛ является ЛИСТОМ. Значит что у него нет потомков. Мы его можем безопастно УДАЛИТЬ
          return null;  //  И вместо этого УЗЛА  ВОЗВРАЩАЕМ  "null"
          //  Как будто его и небыло
        }

        if (!node.left) {       //  Если у нас нет ЛЕВОГО ПОТОМКА
          node = node.right;    //  Мы просто нас вмещаем нашего ПРАВОГО ПОТОМКА. Т.е. ЦЕЛИКОМ ПРАВОЕ поддерево
          return node;          //  И возвращаем обновлённый УЗЕЛ в качестве рещультата
        }

        if (!node.right) {    //  Если у нас нет ПРАВОГО ПОТОМКА
          node = node.right;  //  Вместо текущего УЗЛА, который был найден. Мы положим всё ЕГО ДЕРЕВО
          return node;        //  И ВОЗВРАЩАЕМ обновлённый УЗЕЛ
        }

        //  Последний вариант
        //  Когда у нас есть оба поддерева
        let minFromRight = node.right;  //  Мы решили что будем искать  МИНИМУМ, среди ПРАВОГО поддерева
        while (minFromRight.left) {     //  Пока улемент с лева есть, мы перемещаемся к ниму
          minFromRight = minFromRight.left;   //  Указатель сдвигаем на тот элемент, который находится ЛЕВЕЕ
          //  И как только мы нашли МИНИМАЛЬНЫЙ элемент в ПРАВОМ поддереве
        }
        node.data = minFromRight.data;  //  Мы должны его ЗНАЧЕНИЕ поместить в ЗНАЧЕНИЕ нашего УДАЛЯЕМОГО УЗЛА

        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this.base) {
      return;
    }

    let node = this.base;   //  Дальше заведём ПЕРЕМЕНУЮ, которая будет ХОДИТЬ и ИСКАТЬ самый маленький элемент
    while (node.left) {     //  Начинаем ИСКАТЬ с КОНЯ, А есть ли кто нибудь ЛЕВЕЕ ?
      node = node.left;     //  Если есть, то мы к нему перходим
    }
    //  Как только мы дошли до элкмента, который является самым ЛЕВЫМ. Т,е. самым МАЛЕНЬКИМ
    //  Останавливаем ЦИКЛ  "while"
    return node.data;   //  И ВОЗВРАЩАЕМ  ЗНАЧЕНИЕ этого самого МАЛЕНЬКОГО элемента
  }
  
  max() {
    if (!this.base) {   // Для начала мы проверим. Если у нас элементы в нашем ДЕРЕВЕ
      return;
    }

    let node = this.base;   //  Зоведём ПРЕМЕННУЮ для обхода
    while (node.right) {    //  И будем смотреть. Если есть элемент ПРАВЕЕ. Т.е. есть элемент БОЛЬШЕ
      node = node.right;    //  Мы перйдём к ниму. И так далее. Пока у нас будут в наличии элементы ПРАВЕЕ
    }
    //  Как только эти элементы закончились
    return node.data;   //  Затем мы возвращаем его ЗНАЧЕНИЕ
  }

};

