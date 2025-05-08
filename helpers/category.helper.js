const categoryTree = (categoryList, idParent = "")=>{
    const tree = []
    categoryList.forEach(item => {
        if(idParent == item.parent){
            const children = categoryTree(categoryList,item.id);
            tree.push({
                id: item.id,
                name: item.name,
                children: children
        })}
            
    })
    return tree;
}
module.exports.categoryTree = categoryTree;