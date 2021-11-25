
// DrawCircleView.cpp : implementation of the CDrawCircleView class
//

#include "pch.h"
#include "framework.h"
// SHARED_HANDLERS can be defined in an ATL project implementing preview, thumbnail
// and search filter handlers and allows sharing of document code with that project.
#ifndef SHARED_HANDLERS
#include "DrawCircle.h"
#endif

#include "DrawCircleDoc.h"
#include "DrawCircleView.h"
#include "CDrawCircle.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// CDrawCircleView

IMPLEMENT_DYNCREATE(CDrawCircleView, CView)

BEGIN_MESSAGE_MAP(CDrawCircleView, CView)
	// Standard printing commands
	ON_COMMAND(ID_FILE_PRINT, &CView::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_DIRECT, &CView::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_PREVIEW, &CDrawCircleView::OnFilePrintPreview)
	ON_WM_CONTEXTMENU()
	ON_WM_RBUTTONUP()
END_MESSAGE_MAP()

// CDrawCircleView construction/destruction

CDrawCircleView::CDrawCircleView() noexcept
{
	// TODO: add construction code here

}

CDrawCircleView::~CDrawCircleView()
{
}

BOOL CDrawCircleView::PreCreateWindow(CREATESTRUCT& cs)
{
	// TODO: Modify the Window class or styles here by modifying
	//  the CREATESTRUCT cs

	return CView::PreCreateWindow(cs);
}

// CDrawCircleView drawing

void CDrawCircleView::OnDraw(CDC* pDC)
{
	CDrawCircleDoc* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return;

	CDrawCircle::drawCircleMidpoint(pDC , 300, 300, 200, RGB(0, 155, 0));

	// TODO: add draw code for native data here
}


// CDrawCircleView printing


void CDrawCircleView::OnFilePrintPreview()
{
#ifndef SHARED_HANDLERS
	AFXPrintPreview(this);
#endif
}

BOOL CDrawCircleView::OnPreparePrinting(CPrintInfo* pInfo)
{
	// default preparation
	return DoPreparePrinting(pInfo);
}

void CDrawCircleView::OnBeginPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
{
	// TODO: add extra initialization before printing
}

void CDrawCircleView::OnEndPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
{
	// TODO: add cleanup after printing
}

void CDrawCircleView::OnRButtonUp(UINT /* nFlags */, CPoint point)
{
	ClientToScreen(&point);
	OnContextMenu(this, point);
}

void CDrawCircleView::OnContextMenu(CWnd* /* pWnd */, CPoint point)
{
#ifndef SHARED_HANDLERS
	theApp.GetContextMenuManager()->ShowPopupMenu(IDR_POPUP_EDIT, point.x, point.y, this, TRUE);
#endif
}


// CDrawCircleView diagnostics

#ifdef _DEBUG
void CDrawCircleView::AssertValid() const
{
	CView::AssertValid();
}

void CDrawCircleView::Dump(CDumpContext& dc) const
{
	CView::Dump(dc);
}

CDrawCircleDoc* CDrawCircleView::GetDocument() const // non-debug version is inline
{
	ASSERT(m_pDocument->IsKindOf(RUNTIME_CLASS(CDrawCircleDoc)));
	return (CDrawCircleDoc*)m_pDocument;
}
#endif //_DEBUG


// CDrawCircleView message handlers
