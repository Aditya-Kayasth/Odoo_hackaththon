

def rotate(matrix):
        """
        Do not return anything, modify matrix in-place instead.
        """
        n = len(matrix)

        for i in range(n):
            for j in range(i,n):
                    matrix[i][j],matrix[j][i] = matrix[j][i],matrix[i][j]

            matrix[i].reverse()
        print(matrix)

rotate([[1,2,3],[4,5,6],[7,8,9]])