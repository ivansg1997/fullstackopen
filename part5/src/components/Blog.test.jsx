import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('Tests Exercises 5.13 - 5.16', () => {

    test('the component shows the title but not the author, url, or likes by default', () => {
        const blog = {
            title: "Component testing is done with react-testing-library",
            author: "Iván Sánchez",
            url: "https://localhost:3001/tests",
            likes: 1
        }

        render(<Blog blog={blog} />)

        const content = screen.getByText('Component testing is done with react-testing-library')
        expect(content).toBeDefined()

        /* THE AUTHOR (URL & LIKES) IS HIDDEN BY DEFAULT AND IS SHOWN ONLY WHEN THE BLOG IS EXPANDED. */
        const author = screen.queryByText('Iván Sánchez')
        expect(author).toBeNull()
        /* //////////////////////// */

        const url = screen.queryByText('https://localhost:3001/tests')
        expect(url).toBeNull()
        const likes = screen.queryByText('1')
        expect(likes).toBeNull()
    });

    test('the component shows author, url, and likes when the blog is expanded', async () => {
        const blog = {
            title: "Component testing is done with react-testing-library",
            author: "Iván Sánchez",
            url: "https://localhost:3001/tests",
            likes: 1
        }

        render(<Blog blog={blog} />)

        const user = userEvent.setup()
        const showButton = screen.getByText('show')
        await user.click(showButton)

        const author = screen.getByText('Iván Sánchez')
        expect(author).toBeDefined()
        const url = screen.getByText('https://localhost:3001/tests')
        expect(url).toBeDefined()
        const likes = screen.getByText('1')
        expect(likes).toBeDefined()
    });

    test('clicking the like button twice calls the event handler twice', async () => {
        const blog = {
            title: "Component testing is done with react-testing-library",
            author: "Iván Sánchez",
            url: "https://localhost:3001/tests",
            likes: 1
        }

        const mockHandler = vi.fn()
        render(
            <Blog blog={blog} updateBlog={mockHandler} />
        )

        const user = userEvent.setup()
        const showButton = screen.getByText('show')
        await user.click(showButton)
        
        const likeButton = screen.getByText('like')
        
        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)
    });

    test('<BlogForm /> calls the event handler with the right details when a new blog is created', async () => {
        const mockCreate = vi.fn()
        const user = userEvent.setup()

        render(
            <BlogForm
                onCreate={mockCreate}
                blogs={[]}
                setBlogs={() => {}}
                setMessage={() => {}}
                setTypeMessage={() => {}}
                blogFormRef={{ current: { toggleVisibility: () => {} } }}
            />
        )

        const titleInput = screen.getByPlaceholderText('enter blog title')
        const authorInput = screen.getByPlaceholderText('enter author name')
        const urlInput = screen.getByPlaceholderText('enter blog url')
        const createButton = screen.getByRole('button', { name: /create/i })

        await user.type(titleInput, 'Component testing is done with react-testing-library')
        await user.type(authorInput, 'Iván Sánchez')
        await user.type(urlInput, 'https://localhost:3001/tests')
        await user.click(createButton)

        expect(mockCreate).toHaveBeenCalledTimes(1)
        expect(mockCreate.mock.calls[0][0]).toEqual({
            title: 'Component testing is done with react-testing-library',
            author: 'Iván Sánchez',
            url: 'https://localhost:3001/tests',
            likes: 0,
        })
    })
})
