//////////////////////////////////////////////////////////////////////////////
//
//  Angel.js
//
//////////////////////////////////////////////////////////////////////////////

//----------------------------------------------------------------------------
//
//  Helper functions
//

export function MV()
{

}

MV._argumentsToArray = function( args )
{
    return [].concat.apply( [], Array.prototype.slice.apply(args) );
}

//----------------------------------------------------------------------------

MV.radians = function( degrees ) {
    return degrees * Math.PI / 180.0;
}

//----------------------------------------------------------------------------
//
//  Vector Constructors
//

MV.vec2 = function ()
{
    var result = MV._argumentsToArray( arguments );

    switch ( result.length ) {
    case 0: result.push( 0.0 );
    case 1: result.push( 0.0 );
    }

    return result.splice( 0, 2 );
}

MV.vec3 = function()
{
    var result = MV._argumentsToArray( arguments );

    switch ( result.length ) {
    case 0: result.push( 0.0 );
    case 1: result.push( 0.0 );
    case 2: result.push( 0.0 );
    }

    return result.splice( 0, 3 );
}

MV.vec4 = function()
{
    var result = MV._argumentsToArray( arguments );

    switch ( result.length ) {
    case 0: result.push( 0.0 );
    case 1: result.push( 0.0 );
    case 2: result.push( 0.0 );
    case 3: result.push( 1.0 );
    }

    return result.splice( 0, 4 );
}

//----------------------------------------------------------------------------
//
//  Matrix Constructors
//

MV.mat2 = function()
{
    var v = MV._argumentsToArray( arguments );

    var m = [];
    switch ( v.length ) {
    case 0:
        v[0] = 1;
    case 1:
        m = [
            MV.vec2( v[0],  0.0 ),
            MV.vec2(  0.0, v[0] )
        ];
        break;

    default:
        m.push( vec2(v) );  v.splice( 0, 2 );
        m.push( vec2(v) );
        break;
    }

    m.matrix = true;

    return m;
}

//----------------------------------------------------------------------------

MV.mat3 = function()
{
    var v = MV._argumentsToArray( arguments );

    var m = [];
    switch ( v.length ) {
    case 0:
        v[0] = 1;
    case 1:
        m = [
            MV.vec3( v[0],  0.0,  0.0 ),
            MV.vec3(  0.0, v[0],  0.0 ),
            MV.vec3(  0.0,  0.0, v[0] )
        ];
        break;

    default:
        m.push( vec3(v) );  v.splice( 0, 3 );
        m.push( vec3(v) );  v.splice( 0, 3 );
        m.push( vec3(v) );
        break;
    }

    m.matrix = true;

    return m;
}

//----------------------------------------------------------------------------

MV.mat4 = function()
{
    var v = MV._argumentsToArray( arguments );

    var m = [];
    switch ( v.length ) {
    case 0:
        v[0] = 1;
    case 1:
        m = [
            MV.vec4( v[0], 0.0,  0.0,   0.0 ),
            MV.vec4( 0.0,  v[0], 0.0,   0.0 ),
            MV.vec4( 0.0,  0.0,  v[0],  0.0 ),
            MV.vec4( 0.0,  0.0,  0.0,  v[0] )
        ];
        break;

    default:
        m.push( MV.vec4(v) );  v.splice( 0, 4 );
        m.push( MV.vec4(v) );  v.splice( 0, 4 );
        m.push( MV.vec4(v) );  v.splice( 0, 4 );
        m.push( MV.vec4(v) );
        break;
    }

    m.matrix = true;

    return m;
}

//----------------------------------------------------------------------------
//
//  Generic Mathematical Operations for Vectors and Matrices
//

MV.equal = function( u, v )
{
    if ( u.length != v.length ) { return false; }
   
    if ( u.matrix && v.matrix ) {
        for ( var i = 0; i < u.length; ++i ) {
            if ( u[i].length != v[i].length ) { return false; }
            for ( var j = 0; j < u[i].length; ++j ) {
                if ( u[i][j] !== v[i][j] ) { return false; }
            }
        }
    }
    else if ( u.matrix && !v.matrix || !u.matrix && v.matrix ) {
        return false;
    }
    else {
        for ( var i = 0; i < u.length; ++i ) {
            if ( u[i] !== v[i] ) { return false; }
        }
    }

    return true;
}

//----------------------------------------------------------------------------

MV.add = function( u, v )
{
    var result = [];

    if ( u.matrix && v.matrix ) {
        if ( u.length != v.length ) {
            throw "add(): trying to add matrices of different dimensions";
        }

        for ( var i = 0; i < u.length; ++i ) {
            if ( u[i].length != v[i].length ) {
                throw "add(): trying to add matrices of different dimensions";
            }
            result.push( [] );
            for ( var j = 0; j < u[i].length; ++j ) {
                result[i].push( u[i][j] + v[i][j] );
            }
        }

        result.matrix = true;

        return result;
    }
    else if ( u.matrix && !v.matrix || !u.matrix && v.matrix ) {
        throw "add(): trying to add matrix and non-matrix variables";
    }
    else {
        if ( u.length != v.length ) {
            throw "add(): vectors are not the same dimension";
        }

        for ( var i = 0; i < u.length; ++i ) {
            result.push( u[i] + v[i] );
        }

        return result;
    }
}

//----------------------------------------------------------------------------

MV.subtract = function( u, v )
{
    var result = [];

    if ( u.matrix && v.matrix ) {
        if ( u.length != v.length ) {
            throw "subtract(): trying to subtract matrices" +
                " of different dimensions";
        }

        for ( var i = 0; i < u.length; ++i ) {
            if ( u[i].length != v[i].length ) {
                throw "subtract(): trying to subtact matrices" +
                    " of different dimensions";
            }
            result.push( [] );
            for ( var j = 0; j < u[i].length; ++j ) {
                result[i].push( u[i][j] - v[i][j] );
            }
        }

        result.matrix = true;

        return result;
    }
    else if ( u.matrix && !v.matrix || !u.matrix && v.matrix ) {
        throw "subtact(): trying to subtact  matrix and non-matrix variables";
    }
    else {
        if ( u.length != v.length ) {
            throw "subtract(): vectors are not the same length";
        }

        for ( var i = 0; i < u.length; ++i ) {
            result.push( u[i] - v[i] );
        }

        return result;
    }
}

//----------------------------------------------------------------------------

MV.mult = function( u, v )
{
    var result = [];

    if ( u.matrix && v.matrix ) {
        if ( u.length != v.length ) {
            throw "mult(): trying to add matrices of different dimensions";
        }

        for ( var i = 0; i < u.length; ++i ) {
            if ( u[i].length != v[i].length ) {
                throw "mult(): trying to add matrices of different dimensions";
            }
        }

        for ( var i = 0; i < u.length; ++i ) {
            result.push( [] );

            for ( var j = 0; j < v.length; ++j ) {
                var sum = 0.0;
                for ( var k = 0; k < u.length; ++k ) {
                    sum += u[i][k] * v[k][j];
                }
                result[i].push( sum );
            }
        }

        result.matrix = true;

        return result;
    }
    else if (u.matrix && !v.matrix) 
    {
        if (u.length !== 4 || v.length !== 4) {
            throw "mult(): invalid matrix and vector dimensions for matrix-vector multiplication";
        }

        for (var i = 0; i < 4; ++i) {
            var sum = 0.0;
            for (var k = 0; k < 4; ++k) {
                sum += u[i][k] * v[k];
            }
            result.push(sum);
        }

        return result;
    }
    else {
        if ( u.length != v.length ) {
            throw "mult(): vectors are not the same dimension";
        }

        for ( var i = 0; i < u.length; ++i ) {
            result.push( u[i] * v[i] );
        }

        return result;
    }
}

//----------------------------------------------------------------------------
//
//  Basic Transformation Matrix Generators
//

MV.translate = function( x, y, z )
{
    if ( Array.isArray(x) && x.length == 3 ) {
        z = x[2];
        y = x[1];
        x = x[0];
    }

    var result = MV.mat4();
    result[0][3] = x;
    result[1][3] = y;
    result[2][3] = z;

    return result;
}

//----------------------------------------------------------------------------

MV.rotate = function( angle, axis )
{
    if ( !Array.isArray(axis) ) {
        axis = [ arguments[1], arguments[2], arguments[3] ];
    }

    var v = MV.normalize( axis );

    var x = v[0];
    var y = v[1];
    var z = v[2];

    var c = Math.cos( MV.radians(angle) );
    var omc = 1.0 - c;
    var s = Math.sin( MV.radians(angle) );

    var result = MV.mat4(
        MV.vec4( x*x*omc + c,   x*y*omc - z*s, x*z*omc + y*s, 0.0 ),
        MV.vec4( x*y*omc + z*s, y*y*omc + c,   y*z*omc - x*s, 0.0 ),
        MV.vec4( x*z*omc - y*s, y*z*omc + x*s, z*z*omc + c,   0.0 ),
        MV.vec4()
    );

    return result;
}

MV.rotateZ = function(angle) {
    var c = Math.cos(MV.radians(angle));
    var s = Math.sin(MV.radians(angle));

    var result = MV.mat4(
        MV.vec4(c, -s, 0.0, 0.0),
        MV.vec4(s, c,  0.0, 0.0),
        MV.vec4(0.0, 0.0, 1.0, 0.0),
        MV.vec4(0.0, 0.0, 0.0, 1.0)
    );

    return result;
};

//----------------------------------------------------------------------------

MV.scale = function( x, y, z )
{
    if ( Array.isArray(x) && x.length == 3 ) {
        z = x[2];
        y = x[1];
        x = x[0];
    }

    var result = MV.mat4();
    result[0][0] = x;
    result[1][1] = y;
    result[2][2] = z;

    return result;
}

//----------------------------------------------------------------------------
//
//  ModelView Matrix Generators
//

MV.lookAt = function( eye, at, up )
{
    if ( !Array.isArray(eye) || eye.length != 3) {
        throw "lookAt(): first parameter [eye] must be an a vec3";
    }

    if ( !Array.isArray(at) || at.length != 3) {
        throw "lookAt(): first parameter [at] must be an a vec3";
    }

    if ( !Array.isArray(up) || up.length != 3) {
        throw "lookAt(): first parameter [up] must be an a vec3";
    }

    if ( MV.equal(eye, at) ) {
        return MV.mat4();
    }

    var v = MV.normalize( MV.subtract(at, eye) );  // view direction vector
    var n = MV.normalize( MV.cross(v, up) );       // perpendicular vector
    var u = MV.normalize( MV.cross(n, v) );        // "new" up vector

    v = negate( v );

    var result = MV.mat4(
        MV.vec4( n, -MV.dot(n, eye) ),
        MV.vec4( u, -MV.dot(u, eye) ),
        MV.vec4( v, -MV.dot(v, eye) ),
        MV.vec4()
    );

    return result;
}

//----------------------------------------------------------------------------
//
//  Projection Matrix Generators
//

MV.ortho = function( left, right, bottom, top, near, far )
{
    if ( left == right ) { throw "ortho(): left and right are equal"; }
    if ( bottom == top ) { throw "ortho(): bottom and top are equal"; }
    if ( near == far )   { throw "ortho(): near and far are equal"; }

    var w = right - left;
    var h = top - bottom;
    var d = far - near;

    var result = MV.mat4();
    result[0][0] = 2.0 / w;
    result[1][1] = 2.0 / h;
    result[2][2] = -2.0 / d;
    result[0][3] = -(left + right) / w;
    result[1][3] = -(top + bottom) / h;
    result[2][3] = -(near + far) / d;

    return result;
}

//----------------------------------------------------------------------------

MV.perspective = function( fovy, aspect, near, far )
{
    var f = 1.0 / Math.tan( MV.radians(fovy) / 2 );
    var d = far - near;

    var result = MV.mat4();
    result[0][0] = f / aspect;
    result[1][1] = f;
    result[2][2] = -(near + far) / d;
    result[2][3] = -2 * near * far / d;
    result[3][2] = -1;
    result[3][3] = 0.0;

    return result;
}

//----------------------------------------------------------------------------
//
//  Matrix Functions
//

MV.transpose = function( m )
{
    if ( !m.matrix ) {
        return "transpose(): trying to transpose a non-matrix";
    }

    var result = [];
    for ( var i = 0; i < m.length; ++i ) {
        result.push( [] );
        for ( var j = 0; j < m[i].length; ++j ) {
            result[i].push( m[j][i] );
        }
    }

    result.matrix = true;
    
    return result;
}

//----------------------------------------------------------------------------
//
//  Vector Functions
//

MV.dot = function( u, v )
{
    if ( u.length != v.length ) {
        throw "dot(): vectors are not the same dimension";
    }

    var sum = 0.0;
    for ( var i = 0; i < u.length; ++i ) {
        sum += u[i] * v[i];
    }

    return sum;
}

//----------------------------------------------------------------------------

MV.negate = function( u )
{
    var result = [];
    for ( var i = 0; i < u.length; ++i ) {
        result.push( -u[i] );
    }

    return result;
}

//----------------------------------------------------------------------------

MV.cross = function( u, v )
{
    if ( !Array.isArray(u) || u.length < 3 ) {
        throw "cross(): first argument is not a vector of at least 3";
    }

    if ( !Array.isArray(v) || v.length < 3 ) {
        throw "cross(): second argument is not a vector of at least 3";
    }

    var result = [ 
        u[1]*v[2] - u[2]*v[1],
        u[2]*v[0] - u[0]*v[2],
        u[0]*v[1] - u[1]*v[0]
    ];

    return result;
}

//----------------------------------------------------------------------------

MV.vectorLength = function( u )
{
    return Math.sqrt( MV.dot(u, u) );
}

//----------------------------------------------------------------------------

MV.normalize = function( u, excludeLastComponent )
{ 
    if ( excludeLastComponent ) {
        var last = u.pop();
    }
    
    var len = MV.vectorLength( u );

    if ( !isFinite(len) ) {
        throw "normalize: vector " + u + " has zero length";
    }
    
    for ( var i = 0; i < u.length; ++i ) {
        u[i] /= len;
    }

    if ( excludeLastComponent ) {
        u.push( last );
    }
            
    return u;
}

//----------------------------------------------------------------------------

MV.mix = function( u, v, s )
{
    if ( typeof s !== "number" ) {
        throw "mix: the last paramter " + s + " must be a number";
    }
    
    if ( u.length != v.length ) {
        throw "vector dimension mismatch";
    }

    var result = [];
    for ( var i = 0; i < u.length; ++i ) {
        result.push( (1.0 - s) * u[i] +  s * v[i] );
    }

    return result;
}

MV.inverse = function(matrix) {
    let result = MV.mat4(); // Assuming mat4() creates a 4x4 identity matrix
    let tmp = MV.mat4(); // Temporary matrix for intermediate calculations

    // Copy the original matrix to avoid modifying it
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            tmp[i][j] = matrix[i][j];
        }
    }

    // Gauss-Jordan elimination with partial pivoting
    for (let i = 0; i < 4; i++) {
        // Pivoting
        for (let j = i + 1; j < 4; j++) {
            if (Math.abs(tmp[j][i]) > Math.abs(tmp[i][i])) {
                for (let k = 0; k < 4; k++) {
                    let temp = tmp[i][k];
                    tmp[i][k] = tmp[j][k];
                    tmp[j][k] = temp;

                    temp = result[i][k];
                    result[i][k] = result[j][k];
                    result[j][k] = temp;
                }
            }
        }

        // Make the diagonal contain all 1's
        let pivot = tmp[i][i];
        for (let k = 0; k < 4; k++) {
            tmp[i][k] /= pivot;
            result[i][k] /= pivot;
        }

        // Make the other rows contain all 0's
        for (let j = 0; j < 4; j++) {
            if (j !== i) {
                let factor = tmp[j][i];
                for (let k = 0; k < 4; k++) {
                    tmp[j][k] -= factor * tmp[i][k];
                    result[j][k] -= factor * result[i][k];
                }
            }
        }
    }

    return result;
}

//----------------------------------------------------------------------------
//
// Vector and Matrix functions
//

MV.scale2 = function( s, u )
{
    if ( !Array.isArray(u) ) {
        throw "scale: second parameter " + u + " is not a vector";
    }

    var result = [];
    for ( var i = 0; i < u.length; ++i ) {
        result.push( s * u[i] );
    }
    
    return result;
}

//----------------------------------------------------------------------------
//
//
//

MV.flatten = function( v, flag=false )
{
    if ( v.matrix === true ) {
        v = MV.transpose( v );
    }

    var n = 0;
    var elemsAreArrays = false;

    for (var i = 0; i < v.length; i++) 
    {
        if (Array.isArray(v[i])) 
        {
            n += v[i].length;
        }
        else 
        {
            n++;
        }
    }

    var flatArray;

    if (flag)
    {
        flatArray = new Uint16Array( n );
    }
    else 
    {
        flatArray = new Float32Array( n );
    }

    var idx = 0;
    for ( var i = 0; i < v.length; ++i ) {

        if (Array.isArray(v[i])) 
        {
            for ( var j = 0; j < v[i].length; ++j ) {
                flatArray[idx++] = v[i][j];
            }
        }
        else 
        {
            flatArray[idx++] = v[i];
        }
    }    

    return flatArray;
}

//----------------------------------------------------------------------------

MV.sizeof = {
    'vec2' : new Float32Array( MV.flatten(MV.vec2()) ).byteLength,
    'vec3' : new Float32Array( MV.flatten(MV.vec3()) ).byteLength,
    'vec4' : new Float32Array( MV.flatten(MV.vec4()) ).byteLength,
    'mat2' : new Float32Array( MV.flatten(MV.mat2()) ).byteLength,
    'mat3' : new Float32Array( MV.flatten(MV.mat3()) ).byteLength,
    'mat4' : new Float32Array( MV.flatten(MV.mat4()) ).byteLength,
    'gl.FLOAT': 4
};
