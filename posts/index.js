function foo(arg) {
    function bar(){
        console.log(arguments)
    }
    bar(arg)
}

foo(1, 2, 3)